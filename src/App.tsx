import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

declare global {
  interface Window { deferredEvent: BeforeInstallPromptEvent}
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'denied',
    platform: string
  }>;
}

class App extends Component {

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', e => {
      window.deferredEvent = e as BeforeInstallPromptEvent;
    });
  }

  render() {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/*" element={<NotFoundPage/>} />
          </Routes>
        </Router>
    );
  }
}

export default App;
