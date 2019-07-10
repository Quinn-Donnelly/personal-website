import React, { Component } from 'react'
import './HomePage.css';
import SocialButton from '../../components/SocialButton/SocialButton';


export default class Home extends Component {
  render() {
    return (
      <div id="HomePage" className="HomePage">
        <header className="center">
          <h1>1906 Batch with No name</h1>
          <h4>Continously <strong className="secondary">Learning</strong> and Constantly <strong className="primary">Hacking</strong>.</h4>
        </header>

        <div className="floating-toolbar">
          <SocialButton type="github" />
          <SocialButton type="linkedin" />
          <SocialButton type="twitter" />
          <SocialButton type="email" />
        </div>
      </div>
    )
  }
}
