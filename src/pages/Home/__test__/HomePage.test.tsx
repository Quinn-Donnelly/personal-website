import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../HomePage';

describe('<HomePage />', () => {
  // Better to be done with snapshot test but as long as the 
  // name is rendered that will be fine for now
  it('Should display name', () => {
    const homePage = shallow(<HomePage />);
    const name = 'Quintin Donnelly';
    
    expect(homePage.text()).toContain(name);
  });

  it('site should have the subtitle', () => {
    const homePage = shallow(<HomePage />);
    const subtitleMessage = "Continuously Learning and Constantly Hacking."
  
    expect(homePage.text()).toContain(subtitleMessage);
  });
})
