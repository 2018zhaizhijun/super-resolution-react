import { Map } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = Map({
    isVisible: false,
});

function reducer(state=defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_IS_VISIBLE:
            return state.set('isVisible', action.isVisible);
        default:
            return state;
    }
}

export default reducer;