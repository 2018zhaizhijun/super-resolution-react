import * as actionTypes from './actionTypes';

export const changeIsVisible = (visibleState) => ({
    type: actionTypes.CHANGE_IS_VISIBLE,
    isVisible: visibleState
});
