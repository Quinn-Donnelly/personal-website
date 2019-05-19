import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/HomePage';
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function LazyLoad(LazyComponent: any) {
  return () => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LazyLoad(HomePage)} />
          <Route path="/*" component={LazyLoad(NotFoundPage)} />
        </Switch>
      </Router>
    );
  }
}

export default App;
