import { combineReducers } from 'redux-immutable';
import { reducer as sidebarReducer } from '@components/side-bar/store';
import { reducer as loginReducer } from '@components/login/store';

const cReducer = combineReducers({
    sidebar: sidebarReducer,
    login: loginReducer,
});

export default cReducer;
