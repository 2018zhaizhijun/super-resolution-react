import * as actionTypes from './actionTypes';
import { createAction } from '@reduxjs/toolkit';

export const changeIsVisible = createAction(actionTypes.CHANGE_IS_VISIBLE);
// export const changeIsVisible = (visibleState) => ({
//     type: actionTypes.CHANGE_IS_VISIBLE,
//     isVisible: visibleState
// });
