/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { TheForm } from '../src/components/SignIn';
import '../src/enzymeSetup';

const fakeAuth = {
  isSubmitting: false,
  newUser: false,
  isAuthenticated: false,
  user: {
    userEmail: null,
  },
  error: null,
}

describe('<SignIn />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TheForm auth={fakeAuth} />);
  })
  it('Render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.state("isSignUp")).toEqual(false);
  });

  it('render one textfield for username/email and one for password', () => {
    expect(wrapper.findWhere(n => n.name() === "TextField" && n.prop('name') === "email" )).toHaveLength(1);
    expect(wrapper.findWhere(n => n.name() === "TextField" && n.prop('name') === "password" )).toHaveLength(1);
  });

  it('toggle the state isSignUp when clicking the link next to Button', () => {
    const mockEvent = {preventDefault: () => {}};

    wrapper.findWhere(n => n.prop('component') === "button").simulate('click', mockEvent);
    expect(wrapper.state("isSignUp")).toEqual(true);
    wrapper.findWhere(n => n.prop('component') === "button").simulate('click', mockEvent);
    expect(wrapper.state("isSignUp")).toEqual(false);
  });

  it('Sign In button called correctly', () => {
    const mockEvent = {preventDefault: () => {}};
    const instance = wrapper.instance();

    // re-define the handleFormSubmit as a mock function
    instance.handleFormSubmit = jest.fn();

    // update the instance so handleFormSubmit is the mock function now
    instance.forceUpdate();

    wrapper.find('form').simulate('submit', mockEvent);
    expect(instance.handleFormSubmit).toHaveBeenCalled();
  });
});
