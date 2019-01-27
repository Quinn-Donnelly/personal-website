import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

describe('<Home />', () => {
  it('should have maintenance message', () => {
    const homePage = shallow(<Home />);
    const welcomeMessage = <p className="App-intro">
      Site under construction, sorry for the inconvenience. 
    </p>
  
    expect(homePage.contains(welcomeMessage)).toEqual(true);
  });

  // Better to be done with snapshot test but as long as the 
  // name is rendered that will be fine for now
  it('Should display name', () => {
    const homePage = shallow(<Home />);
    const name = 'Quintin Donnelly';
    
    expect(homePage.text()).toContain(name);
  })
})
