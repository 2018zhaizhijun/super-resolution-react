import React from 'react';
import LoginForm from '@components/login-form';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '@store';

describe('Login form render', () => {

  it('login state should match snapshot', () => {
    const loginWrapper = renderer.create(
        <Provider store={store}>
            <LoginForm isRegistering={false} />
        </Provider>
    ).toJSON();
    expect(loginWrapper).toMatchSnapshot();
  });

  it('registering state should match snapshot', () => {
    const registerWrapper = renderer.create(
        <Provider store={store}>
            <LoginForm isRegistering={true} />
        </Provider>
    ).toJSON();
    expect(registerWrapper).toMatchSnapshot();
  });

  it('should change registering state when register button clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
          <LoginForm isRegistering={false} />
      </Provider>
    );
    
    wrapper.find('#registerButton').simulate('click');
    expect(wrapper.exists('.registerForm')).toBeTruthy();
    expect(wrapper.exists('.loginForm')).toBeFalsy();

    wrapper.find('#backtoLoginButton').simulate('click');
    expect(wrapper.exists('.loginForm')).toBeTruthy();
    expect(wrapper.exists('.registerForm')).toBeFalsy();
  });

})