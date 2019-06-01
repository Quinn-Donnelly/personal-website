import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import App, { LazyLoad } from './App';
import { shallow, mount } from 'enzyme';


describe('<App />', () => {
  // Smoke test the app
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });


  it('Calling LazyLoad has loading text fallback', () => {
    const TestComponent = () => 'test'
    const dynamicImport = mount(LazyLoad(TestComponent)());
    expect(dynamicImport.prop('fallback')).toEqual(<div>Loading...</div>)
  });

  it('Has prop component as child', () => {
    const TestComponent = () => 'test'
    const dynamicImport = mount(LazyLoad(TestComponent)());
    expect(dynamicImport.contains(TestComponent));
  });
});
