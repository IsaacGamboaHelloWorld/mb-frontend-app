import { Action, createReducer, on } from '@ngrx/store';

import {
  logoutUserErrorAction,
  logoutUserSuccessAction,
  setIsLoggedAction
} from '@store/actions/global.actions';

export const initialState = false;

const featureReducer = createReducer(
  initialState,
  on(setIsLoggedAction, (state, action) => {
    return action.isLogged;
  }),
  on(logoutUserSuccessAction, logoutUserErrorAction, (state, action) => {
    return false;
  })
);

export const isLoggedInReducer = (state: boolean, action: Action): boolean => {
  return featureReducer(state, action);
};
