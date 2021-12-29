import { phoneLogin, getAvatar, getProfile, logout, sendAvatar } from '@service/login';
import * as actionTypes from './actionTypes';
import { message } from 'antd';

import { sendUsrinfo } from '@service/login';

export const changeIsVisible = (visibleState) => ({
    type: actionTypes.CHANGE_IS_VISIBLE,
    isVisible: visibleState
});

// export const changeRegisterState = (registerState) => ({
//     type: actionTypes.CHANGE_IS_VISIBLE,
//     registering: registerState
// });

export const changeLoginState = (loginState) => ({
    type: actionTypes.CHANGE_LOGIN_STATE,
    isLogin: loginState
});

// export const changeAvatar = (avatarUrl) => ({
//     type: actionTypes.CHANGE_AVATAR,
//     avatarUrl
// });

export const changeProfile = (profile) => ({
    type: actionTypes.CHANGE_PROFILE,
    profile
});

export const changeToken = (token) => ({
    type: actionTypes.CHANGE_PROFILE,
    token
});

export const performLogin = (telephone, password) => {
    return (dispatch) => {
        phoneLogin(telephone, password).then((response) => {
            console.log(response);
            if (response.statusCode != 200) {
                message.error('账号或密码错误');
            }
            else {
                const token = response.data.token;
                dispatch(changeLoginState(true));
                dispatch(changeToken(token));

                // sendUsrinfo('', 'zz', 1).then((r)=>{
                //     console.log(r);
                //     if (r.statusCode == 200) {
                getProfile().then((res) => {
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
                });

                // getAvatar().then((res) => {
                //     console.log(res);
                //     dispatch(changeAvatar(res))
                //     // if (res.statusCode != 200) {
                //     //     message.error('用户头像获取失败');
                //     // }
                //     // else {
                //     //     dispatch(changeAvatar(res.data.avatar));
                //     // }
                // });

                dispatch(changeIsVisible(false));
                //     }
                    
                // });    
            }
        })
    };
};

export const performLogout = () => {
    return (dispatch) => {
        logout().then( (res) => {
            if (res.statusCode == 200) {
                dispatch(changeLoginState(false));
            }
            else {
                message.error('退出登录失败');
            }
        });
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
//         });
//     };
// };
