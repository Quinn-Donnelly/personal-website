import React, { Component } from 'react'
import './HomePage.css';
import SocialButton from '../../components/SocialButton/SocialButton';

export default class Home extends Component {
  render() {
    return (
      <div id="HomePage" className="HomePage">
        <header className="center">
          <h1>Quintin Donnelly</h1>
          <h4>Continously <strong className="secondary">Learning</strong> and Constantly <strong className="primary">Hacking</strong>.</h4>
        </header>

        <SocialButton />
      </div>
    )
  }
}
