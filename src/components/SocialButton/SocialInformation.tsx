import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

interface SocialInfo {
  icon: any,
  url: string,
}

const SocialInformation: Map<string, SocialInfo> = new Map([
  ['linkedin', {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/quintin-donnelly"
  }],
  ['github', {
    icon: faGithubSquare,
    url: "https://github.com/Quinn-Donnelly"
  }],
  ['email', {
    icon: faEnvelopeSquare,
    url: "mailto:quinndonnelly22@gmail.com"
  }],
])

export default SocialInformation;