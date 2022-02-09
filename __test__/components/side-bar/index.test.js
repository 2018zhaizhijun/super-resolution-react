import React from 'react';
import SideBar from '@components/side-bar';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '@store';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

describe('side bar render', () => {

  it('side bar should match snapshot', () => {
    const barWrapper = renderer.create(
        <Provider store={store}>
            <BrowserRouter>
                <SideBar />
            </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(barWrapper).toMatchSnapshot();
  });

  it('different navigation buttons of sidebar should lead to correct url path', () => {
    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <SideBar />
            </BrowserRouter>
        </Provider>
    );

    expect(wrapper.find('#toTransPage').first().prop('to'))
        .toEqual('/main/transform');

    expect(wrapper.find('#toIntroPage').first().prop('to'))
        .toEqual('/main/discribe');

  })

})