import React, { Component } from 'react'
import './HomePage.css';
import { Link } from 'react-router-dom';
import SocialButton from '../../components/SocialButton/SocialButton';


export default class Home extends Component {
  render() {
    return (
      <div id="HomePage" className="HomePage">
        <header className="center">
          <h1>Quintin Donnelly</h1>
          <h4>Continously <strong className="secondary">Learning</strong> and Constantly <strong className="primary">Hacking</strong>.</h4>
          <Link to="/quintin-donnelly-resume.pdf" target="_blank">Open for Opportunities</Link>
        </header>

        <section className="bottom-message">
          <h4 className="">This site is currently under construction...</h4>
        </section>

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
