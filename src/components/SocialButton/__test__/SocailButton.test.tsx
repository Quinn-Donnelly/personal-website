import React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Link } from 'react-router-dom';
import SocialButton from '../SocialButton';
import SocialInformation from '../SocialInformation';

describe('<SocailButton />', () => {
  it('should link to the appropriate url', () => {
    const button = shallow(<SocialButton type="email"/>);
  
    const correctInfo = SocialInformation.get('email');
    if (!correctInfo) {
      fail();
      return;
    }

    expect(button.find('a').prop('href')).toEqual(correctInfo.url);
  });

  it('should render nothing if no scail link found', () => {

    const Test = () => <></>

    const button = shallow(<SocialButton type="asdf"/>);
    const empty = shallow(<Test />);

    expect(button).toEqual(empty);    
  });
})
