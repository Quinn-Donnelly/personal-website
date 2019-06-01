
import React, { FunctionComponent } from 'react'
import './SocialButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialInformation from './SocialInformation';

interface SocialButtonProps {
  type: string
}

const SocialButton: FunctionComponent<SocialButtonProps> = ({type}) => {
  const socialInfo = SocialInformation.get(type);

  // If there is no matching social information render nothing
  if (!socialInfo) {
    // TODO: report social tag is broken
    return (
      <></>
    )
  }

  return (
    <div className="SocialButton">
      <a href={socialInfo.url} target="__blank" rel="noopener noreferrer" aria-label={`Connect with me via ${type}`}>
        <FontAwesomeIcon icon={socialInfo.icon} />
      </a>
    </div>
  )
}

export default SocialButton;