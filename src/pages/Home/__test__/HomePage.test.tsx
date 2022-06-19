import React from 'react';
import HomePage from '../HomePage';
import {render, screen} from "@testing-library/react";

describe('<HomePage />', () => {
  it('Should have construction message', () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/This site is currently under construction.../i);
    expect(linkElement).toBeInTheDocument();
  })
})
