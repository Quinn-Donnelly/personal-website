import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import SocialButton from '../SocialButton';

describe('<SocailButton />', () => {
  it('should render an icon', () => {
    const button = shallow(<SocialButton />);
  
    expect(button.find(<i></i>)).toEqual(true);
  });
})
