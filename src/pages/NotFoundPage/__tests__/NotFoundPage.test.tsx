import React from 'react';
import NotFoundPage from "../NotFoundPage";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

describe('<NotFoundPage />', () => {
  it('should tell user page not found', () => {
    render(<NotFoundPage/>, {wrapper: MemoryRouter});
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/")
  });
})
