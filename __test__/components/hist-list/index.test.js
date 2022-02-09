import React from 'react';
import renderer from 'react-test-renderer';
// import { act } from 'react-dom/test-utils';
// import { mount } from 'enzyme';
import HistList from '@components/hist-list';
// import MockAdapter from 'axios-mock-adapter';
// import axiosInstance from '@service/request';
//import toJson from "enzyme-to-json";

//let axiosMock = new MockAdapter(axiosInstance);

describe('actions about showing and deleting history items', () => {
    const list = [
        {
            'id': '1.jpg',
            'rawMaterial': 'mock/rawMaterial',
            'result': 'mock/result',
            'type': '0'
        },
        {
            'id': '2.mp4',
            'rawMaterial': 'mock/rawMaterial',
            'result': 'mock/result',
            'type': '1'
        }
    ]

    it('showing history list should be done correctly', () => {
        const histWrapper = renderer.create(
            <HistList initialList={list} />
        ).toJSON();
        
        expect(histWrapper).toMatchSnapshot();
    })

    // it('deleting history item should be done correctly', () => {
    //     const mockDeleteData = {
    //         'statusCode': 200,
    //         'errmsg': '成功',
    //         'data': {}
    //     }
          
    //     axiosMock.onDelete('/history').reply(200, mockDeleteData)
    //     let histWrapper = null;
    //     act(() => {
    //         histWrapper = mount(
    //             <HistList initialList={list} />
    //         );
    //         histWrapper.find('.anticon-close').first().simulate('click');
    //     })
    //     // click的callback函数包含异步请求，会在其执行完之前执行expect
    //     let updateList = histWrapper.find('Card');
    //     expect(updateList.length).toEqual(1);
    //     expect(updateList.first().props.key).toEqual('2.mp4');
    // })

})