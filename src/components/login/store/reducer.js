import { Map } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = Map({
    isVisible: false,
    //registering: false,
    isLogin: false,
    profile: {
        avatarUrl: null,
        usrname: null,
        telephone: null,
        sex: 0,
    },
    token: null,
});

function reducer(state=defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_IS_VISIBLE:
            return state.set('isVisible', action.isVisible);
        // case actionTypes.CHANGE_REGISTER_STATE:
        //     return state.set('registering', action.registering);
        case actionTypes.CHANGE_LOGIN_STATE:
            return state.set('isLogin', action.isLogin);
        // case actionTypes.CHANGE_AVATAR:
        //     return state.set('avatarUrl', action.avatarUrl);
        case actionTypes.CHANGE_PROFILE:
            return state.set('profile', {...state.get('profile'), ...action.profile});
        case actionTypes.CHANGE_TOKEN:
            return state.set('token', action.token);
        default:
            return state;
    }
}

export default reducer;