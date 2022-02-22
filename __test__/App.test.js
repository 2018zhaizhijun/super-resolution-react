import React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { mount } from 'enzyme';
import toJson from "enzyme-to-json";
import App from '@/App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const loginStore = mockStore(Map({
    login: {
        isLogin: true,
        isVisible: false,
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

// 使用了路由懒加载后，wrapper的snapshot里只有Loadable组件，没有被加载组件的实际内容了，无法用原方法测试

describe('User info form render', () => {
    
    // it('visits to different pages should be correct', () => {
    //     window.history.pushState({}, 'Test page /main/invalid', '/main/invalid');
    //     const wrapper = mount(<App />);
    //     expect(wrapper.exists('.PageNotFound')).toBeTruthy();
    // })

    it('visit to path / should be redirected to /main/transform', () => {
        window.history.pushState({}, 'Test page /', '/');
        const wrapper = mount(<App />);
        expect(wrapper.exists('.transPage')).toBeTruthy();
    })

    // it('visit to path /main/discribe', () => {
    //     window.history.pushState({}, 'Test page /main/discribe', '/main/discribe');
    //     const wrapper = mount(<App />);
    //     expect(wrapper.exists('.introPage')).toBeTruthy();
    // })

    // it('visit to path /main/history with login', () => {
    //     window.history.pushState({}, 'Test page /main/history', '/main/history');
    //     const wrapper = mount(<App testStore={loginStore}/>);
    //     expect(wrapper.exists('.histPage')).toBeTruthy();
    // })

    // it('visit to path /main/history without login should be redirected to /main/transform', () => {
    //     window.history.pushState({}, 'Test page /main/history', '/main/history');
    //     const wrapper = mount(<App />);
    //     expect(wrapper.exists('.transPage')).toBeTruthy();
    // })

    // it('visit to path /main/usrInfo with login', () => {
    //     window.history.pushState({}, 'Test page /main/usrInfo', '/main/usrInfo');
    //     const wrapper = mount(<App testStore={loginStore}/>);
    //     expect(wrapper.exists('.usrinfoPage')).toBeTruthy();
    // })

    // it('visit to path /main/usrInfo without login should be redirected to /main/transform', () => {
    //     window.history.pushState({}, 'Test page /main/usrInfo', '/main/usrInfo');
    //     const wrapper = mount(<App />);
    //     expect(wrapper.exists('.transPage')).toBeTruthy();
    // })

})