import { Action, createReducer, on } from '@ngrx/store';

import {
  setAuthAction,
  turnOnComplementaryAction
} from '@store/actions/global.actions';
import { IAuthData } from '@commons/entities/auth-data.entities';

export const initialState = null;

const featureReducer = createReducer(
  initialState,
  on(setAuthAction, (state, { auth }) => {
    return auth;
  }),
  on(turnOnComplementaryAction, (state: IAuthData) => {
    return {
      ...state,
      complementary: true,
      couldHaveComplementary: false
    };
  })
);

export const authDataReducer = (state: boolean, action: Action): boolean => {
  return featureReducer(state, action);
};
