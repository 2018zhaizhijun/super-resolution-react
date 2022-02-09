import React from 'react';
import MainHeader from '@components/main-header';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from '@store';
import { Map } from 'immutable';
import { mount } from 'enzyme';
import toJson from "enzyme-to-json";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const loginStore = mockStore(Map({
    login: {
        isLogin: true,
        profile: {
            avatarUrl: null,
            usrname: 'zz',
            telephone: '12345678910',
            sex: 1,
        }
    },
    sidebar: {
        isVisible: false
    }
}));

describe('main header render', () => {

  it('main header without login should match snapshot', () => {
    const headerWrapper = renderer.create(
        <Provider store={store}>
            <BrowserRouter>
                <MainHeader />
            </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(headerWrapper).toMatchSnapshot();
  });

  it('main header with login should match snapshot', () => {
    const headerWrapper = mount(
        <Provider store={loginStore}>
            <BrowserRouter>
                <MainHeader />
            </BrowserRouter>
        </Provider>
    );
    headerWrapper.find('.drop-menu').simulate('mouseover');
    expect(toJson(headerWrapper)).toMatchSnapshot();
  });

  it('different navigation buttons should lead to correct url path', () => {
    const wrapper = mount(
        <Provider store={loginStore}>
            <BrowserRouter>
                <MainHeader />
            </BrowserRouter>
        </Provider>
    );

    expect(wrapper.find('#toTransPage').first().prop('to'))
        .toEqual('/main/transform');

    expect(wrapper.find('#toIntroPage').first().prop('to'))
        .toEqual('/main/discribe');

    //const test = wrapper.find('.drop-menu');
    const dropMenu = wrapper.find('Dropdown').prop('overlay')();
    const dropWrapper = mount(
        <BrowserRouter>
            { dropMenu }
        </BrowserRouter>
    );
    expect(dropWrapper.find('#toUsrinfoPage').first().prop('to'))
        .toEqual('/main/usrInfo');
    expect(dropWrapper.find('#toHistPage').first().prop('to'))
        .toEqual('/main/history');
  })

})