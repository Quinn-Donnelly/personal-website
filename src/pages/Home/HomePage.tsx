import React, {Component} from 'react'
import './HomePage.css';
import SocialButton from '../../components/SocialButton/SocialButton';


export default class Home extends Component {
  render() {
    return (
      <div id="HomePage" className="HomePage">
        <header className="center">
          <h1>Quintin Donnelly</h1>
          <h4>Continuously <strong className="secondary">Learning</strong> and Constantly <strong className="primary">Hacking</strong>.</h4>
        </header>

        <section className="bottom-message">
          <h4 className="">This site is currently under construction...</h4>
        </section>

        <div className="floating-toolbar">
          <SocialButton type="github" />
          <SocialButton type="linkedin" />
          <SocialButton type="email" />
        </div>
      </div>
    )
  }
}
