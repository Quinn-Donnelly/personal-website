import React from 'react';
import SocialButton from '../SocialButton';
import {render, screen} from "@testing-library/react";

describe('<SocailButton />', () => {
  it('Should render an icon', () => {
    render(<SocialButton type="github" />);
    const aTag = screen.getByRole("link");

    expect(aTag).toBeInTheDocument();
    expect(aTag).toHaveAttribute("href", "https://github.com/Quinn-Donnelly");
  })
})
