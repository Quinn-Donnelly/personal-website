#!/usr/bin/env bash
set -e # halt script on error 
ls
zip -r website.zip build 
curl -H "Content-Type: application/zip" \ 
    -H "Authorization: Bearer $netlify_token" \ 
    --data-binary "@website.zip" \ 
    https://api.netlify.com/api/v1/sites/blissful-noether-dca508.netlify.com/deploys