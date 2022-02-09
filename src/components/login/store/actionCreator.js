import { phoneLogin, getAvatar, getProfile, logout, sendAvatar } from '@service/login';
import * as actionTypes from './actionTypes';
import { message } from 'antd';
import { createAction } from '@reduxjs/toolkit';

import { sendUsrinfo } from '@service/login';

// 用createAction创建action可以不用再对其额外写单元测试
export const changeIsVisible = createAction(actionTypes.CHANGE_IS_VISIBLE);
// export const changeIsVisible = (visibleState) => ({
//     type: actionTypes.CHANGE_IS_VISIBLE,
//     isVisible: visibleState
// });

// export const changeRegisterState = (registerState) => ({
//     type: actionTypes.CHANGE_IS_VISIBLE,
//     registering: registerState
// });

export const changeLoginState = createAction(actionTypes.CHANGE_LOGIN_STATE);
// export const changeLoginState = (loginState) => ({
//     type: actionTypes.CHANGE_LOGIN_STATE,
//     isLogin: loginState
// });

// export const changeAvatar = (avatarUrl) => ({
//     type: actionTypes.CHANGE_AVATAR,
//     avatarUrl
// });

export const changeProfile = createAction(actionTypes.CHANGE_PROFILE);
// export const changeProfile = (profile) => ({
//     type: actionTypes.CHANGE_PROFILE,
//     profile
// });

export const changeToken = createAction(actionTypes.CHANGE_TOKEN);
// export const changeToken = (token) => ({
//     type: actionTypes.CHANGE_TOKEN,
//     token
// });

export const performLogin = (telephone, password) => {
    return (dispatch) => {
        return phoneLogin(telephone, password).then((response) => {
            console.log(response);
            if (response.statusCode != 200) {
                message.error('账号或密码错误');
            }
            else {
                const token = response.data.token;
                dispatch(changeLoginState(true));
                dispatch(changeToken(token));
                dispatch(changeIsVisible(false));

                return getProfile();  
            }
        }).then((res) => {
            console.log(res);
            if (res.statusCode != 200) {
                message.error('用户信息获取失败');
            }
            else {
                let data = res.data;
                dispatch(changeProfile({
                    avatarUrl: data.avatar,
                    usrname: data.trueName,
                    telephone,
                    sex: data.sex,
                }));
            }
        }).catch((e) => {
            message.error('登录失败');
            console.error('phoneLoginError', e);
        })
    };
};

export const performLogout = () => {
    return (dispatch) => {
        return logout().then( (res) => {
            if (res.statusCode == 200) {
                dispatch(changeLoginState(false));
            }
            else {
                throw new Error('statusCode' + res.statusCode);
            }
        }).catch((e) => {
            message.error('退出登录失败');
            console.error('logoutError', e);
        })
    };
};

// export const updateAvatar = (avatarFile) => {
//     return (dispatch) => {
//         sendAvatar(avatarFile).then( (res) => {
//             if (res.statusCode == 200) {
//                 dispatch(changeAvatar(res.data.avatarUrl));
//             }
//             else {
//                 message.error('头像上传失败');
//             }
//         }).catch((e) => console.error('sendAvatarError', e.message))
//     };
// };
