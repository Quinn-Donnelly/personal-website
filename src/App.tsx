import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
