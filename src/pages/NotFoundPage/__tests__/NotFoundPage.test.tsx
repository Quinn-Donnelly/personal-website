import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

describe('<NotFoundPage />', () => {
  it('should tell user page not found', () => {
    const notFoundPage = shallow(<NotFoundPage />);
    const notFoundMessage = '404';
  
    expect(notFoundPage.contains(notFoundMessage)).toEqual(true);
  });

  it('should link the user to the home page', () => {
    const notFoundPage = shallow(<NotFoundPage />);
    const homeLink = <Link to="/" />;
    const link = notFoundPage.find('.link');

    expect(link.prop('to')).toEqual('/');
  });
})
