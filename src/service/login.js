import request from './request';
import qs from 'qs';

export const phoneLogin = (telephone, password) => {
    return request({
        url: '/user/login/password',
        method: 'get',
        params: {
            password,
            telephone,
        },
    });
};

export const getAvatar = () => {
    return request({
        url: '/user/avatar',
        method: 'get',
    });
};

export const sendAvatar = (avatarFile) => {
    return request({
        url: '/upload/avatar',
        method: 'post',
        // headers: {
        //     'content-type': 'multipart/form-data',
        // },
        data: {
            'avatar': avatarFile,
        },
    });
};

export const getProfile = () => {
    return request({
        url: '/user/info',
        method: 'get',
    });
};

export const sendUsrinfo = (avatarUrl, usrname, sex) => {
    let params = {
        avatar: avatarUrl,
        trueName: usrname,
        sex,
    };
    return request({
        url: '/user/info',
        method: 'post',
        data: params,
        // data: {
        //     userInfoModifyMapper: params
        // },
        // data: JSON.stringify({
        //     userInfoModifyMapper: params
        // }),
    });
};

export const sendRegister = (userName, password, telephone, verifyCode) => {
    return request({
        url: '/user/registry',
        method: 'post',
        params: {
            password,
            telephone,
            userName,
            verifyCode,
        },
    });
};

export const sendRegisterCode = () => {

};

export const logout = () => {
    return request({
        url: '/user/logout',
        method: 'get',
    });
};