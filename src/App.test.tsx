import React from 'react';
import {act, createEvent, fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('renders name on main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quintin Donnelly/i);
  expect(linkElement).toBeInTheDocument();
});

test('stores event on beforeInstallPrompt', async () => {
  expect(window.deferredEvent).toBeUndefined()

  const event = createEvent('beforeinstallprompt', window, {
    userChoice: new Promise((res) => res({outcome: 'accepted', platform: ''})),
    prompt: () => new Promise((res) => res(undefined))
  })

  fireEvent(window, event);
  expect(window.deferredEvent).toBeDefined()
});
