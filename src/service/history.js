import request from './request';
import { message } from 'antd';

export const getCount = () => {
    return request({
        url: '/history/count',
        method: 'get',
    });
};

export const getHistPage = (page, pageSize) => {
    return request({
        url: '/history/modify/desc',
        method: 'get',
        params: {
            page,
            pageSize,
        },
    });
};

export const getHistList = async() => {
    let res = await getCount();
    if (res.statusCode == 200) {
        const count = res.data.count;
        let response = await getHistPage(1, count);
        if (response.statusCode == 200) {
            //console.log(response.data);
            return response.data;
        }
        else {
            throw new Error('getHistPage statusCode' + response.statusCode);
        }
    }
    else {
        throw new Error('getCount statusCode' + res.statusCode);
    }
    //return [];
};

export const deleteHist = (historyId) => {
    return request({
        url: '/history',
        method: 'delete',
        params: {
            historyId,
        },
    });
};

export const deleteHistBatch = (historyIds) => {
    return request({
        url: '/history/batch',
        method: 'delete',
        params: {
            historyIds,
        },
    });
};
