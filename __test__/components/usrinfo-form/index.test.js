import React from 'react';
import UsrInfoForm from '@components/usrinfo-form';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
// import MockAdapter from 'axios-mock-adapter';
// import axiosInstance from '@service/request';
// import toJson from "enzyme-to-json";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
//const axiosMock = new MockAdapter(axiosInstance)

describe('User info form render', () => {
    const store = mockStore(Map({
        login: {
            profile: {
                avatarUrl: null,
                usrname: 'zz',
                telephone: '12345678910',
                sex: 1,
            }
        }
    }));

    it('info displaying state should match snapshot', () => {
        const infoWrapper = renderer.create(
            <Provider store={store}>
                <UsrInfoForm isEditing={false} />
            </Provider>
        ).toJSON();
        expect(infoWrapper).toMatchSnapshot();
    });

    it('editing state should match snapshot', () => {
        const editWrapper = renderer.create(
            <Provider store={store}>
                <UsrInfoForm isEditing={true} />
            </Provider>
        ).toJSON();
        expect(editWrapper).toMatchSnapshot();
    });

    it('should change editing state when edit button clicked', () => {
        // const mockCommitData = {
        //     'statusCode': 200,
        //     'errmsg': '成功',
        //     'data': {}
        //   }
        // axiosMock.onPost('/user/info').reply(200, mockCommitData)

        const wrapper = mount(
            <Provider store={store}>
                <UsrInfoForm isEditing={false} />
            </Provider>
        );
        expect(wrapper.exists('.infoForm')).toBeTruthy();
        
        wrapper.find('#editButton').first().simulate('click');
        expect(wrapper.exists('.editForm')).toBeTruthy();
        expect(wrapper.exists('.infoForm')).toBeFalsy();

        wrapper.find('#cancelButton').first().simulate('click');
        expect(wrapper.exists('.infoForm')).toBeTruthy();
        expect(wrapper.exists('.editForm')).toBeFalsy();

        // wrapper.find('#editButton').first().simulate('click');
        // //表单提交的回调函数是异步函数，这里无法等到其执行完再进行expect
        // wrapper.find('form').simulate('submit');
        // //expect(toJson(wrapper)).toMatchSnapshot();
        // expect(wrapper.exists('.infoForm')).toBeTruthy();
        // expect(wrapper.exists('.editForm')).toBeFalsy();
    });

})