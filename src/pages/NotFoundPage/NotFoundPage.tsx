import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export class NotFoundPage extends Component {
  render() {
    return (
      <div className="page">
        <h2 className="title">404</h2>
        <p>The page you are looking for doesn't exist</p>
        <p><Link className="link" to="/">Click here to return home</Link></p>
      </div>
    )
  }
}

export default NotFoundPage;
