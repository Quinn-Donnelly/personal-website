terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }

    github = {
      source  = "integrations/github"
      version = "~> 4.0"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

variable "repo_name" {
  type        = string
  description = "Used for naming github repo and projects for dev ops resources"
}

variable "coveralls_repo_token" {
  type        = string
  description = "Token for coveralls access"
  sensitive   = true
}

variable "bundlesize_github_token" {
  type = string
  description = "Token for bundlesize to post status in Github"
  sensitive = true
}

resource "aws_iam_role_policy" "cloudwatch-policy" {
  name = "${var.repo_name}-cloudwatch-policy"
  role = aws_iam_role.codebuild_role.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Resource" : [
          "arn:aws:logs:us-east-1:778172975102:log-group:codebuild-${var.repo_name}",
          "arn:aws:logs:us-east-1:778172975102:log-group:codebuild-${var.repo_name}:*"
        ],
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "codebuild-policy" {
  name = "${var.repo_name}-codebuild-policy"
  role = aws_iam_role.codebuild_role.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect": "Allow",
        "Resource": "arn:aws:codestar-connections:us-east-1:778172975102:connection/7abf61da-6944-4302-a3cd-cfad3a78903e",
        "Action": "codestar-connections:UseConnection"
      },
      {
        "Effect" : "Allow",
        "Resource" : [
          "arn:aws:logs:us-east-1:778172975102:log-group:/aws/codebuild/${var.repo_name}",
          "arn:aws:logs:us-east-1:778172975102:log-group:/aws/codebuild/${var.repo_name}:*"

        ],
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
      },
      {
        "Effect" : "Allow",
        "Resource" : [
          "arn:aws:s3:::codepipeline-us-east-1-*"
        ],
        "Action" : [
          "s3:PutObject",
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:GetBucketAcl",
          "s3:GetBucketLocation"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "codebuild:CreateReportGroup",
          "codebuild:CreateReport",
          "codebuild:UpdateReport",
          "codebuild:BatchPutTestCases",
          "codebuild:BatchPutCodeCoverages"
        ],
        "Resource" : [
          "arn:aws:codebuild:us-east-1:778172975102:report-group/${var.repo_name}-*"
        ]
      },
      {
        "Effect": "Allow",
        "Action": "s3:*",
        "Resource": [
          aws_s3_bucket.artifact-bucket.arn,
          "${aws_s3_bucket.artifact-bucket.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role" "codebuild_role" {
  name = "${var.repo_name}-codebuild-service-role"

  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Sid       = ""
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    project : var.repo_name
  }
}

resource "aws_codebuild_project" "example" {
  name          = var.repo_name
  description   = "Builds each commit of ${var.repo_name}"
  build_timeout = "5"
  service_role  = aws_iam_role.codebuild_role.arn
  badge_enabled = true

  artifacts {
    type = "S3"
    location = aws_s3_bucket.artifact-bucket.id
    namespace_type = "BUILD_ID"
    encryption_disabled = true
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:5.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"

    environment_variable {
      name  = "coveralls_repo_token"
      value = var.coveralls_repo_token
    }

    environment_variable {
      name  = "BUNDLEWATCH_GITHUB_TOKEN"
      value = var.bundlesize_github_token
    }
  }

  logs_config {
    cloudwatch_logs {
      group_name = "/aws/codebuild/${var.repo_name}"
    }

    # Currently not using s3 logs
    #    s3_logs {
    #      status   = "ENABLED"
    #      location = "${aws_s3_bucket.example.id}/codebuild-log"
    #    }
  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/Quinn-Donnelly/personal-website"
    git_clone_depth = 1

    git_submodules_config {
      fetch_submodules = true
    }
  }

  tags = {
    project = var.repo_name
  }
}

resource "aws_codebuild_webhook" "build-hook" {
  project_name = aws_codebuild_project.example.name
  build_type   = "BUILD"
  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH, PULL_REQUEST_CREATED, PULL_REQUEST_REOPENED"
    }

    filter {
      type    = "ACTOR_ACCOUNT_ID"
      # use https://api.github.com/users/<username> and use your "id" this will restrict builds to only trigger via
      # this github user pushing
      pattern = "8989563"
    }

    filter {
      pattern = "refs/heads/master"
      type    = "HEAD_REF"
      exclude_matched_pattern = true
    }
  }
}

resource "aws_s3_bucket" "artifact-bucket" {
  bucket = "${var.repo_name}-artifact-bucket"

  tags = {
    project = var.repo_name
  }
}

resource "aws_s3_bucket_acl" "artifact-bucket-acl" {
  bucket = aws_s3_bucket.artifact-bucket.id
  acl = "public-read"
}

resource "aws_s3_bucket_policy" "public-read" {
  bucket = aws_s3_bucket.artifact-bucket.id
  policy = data.aws_iam_policy_document.public-read-document.json
}

data "aws_iam_policy_document" "public-read-document" {
  statement {
    sid = "AllowPublicRead"
    principals {
      identifiers = ["*"]
      type        = "*"
    }
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion"
    ]
    resources = ["${aws_s3_bucket.artifact-bucket.arn}/*"]
  }
}