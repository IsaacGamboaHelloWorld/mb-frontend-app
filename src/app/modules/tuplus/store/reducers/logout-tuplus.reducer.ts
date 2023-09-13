import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/tuplus/store/actions/logout-tuplus.action';
import { ILogoutTuplusState } from '@modules/tuplus/store/states/logout-tuplus.state';

export const initLogoutTuplus: ILogoutTuplusState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const logoutTuplus = createReducer(
  initLogoutTuplus,
  on(actions.logoutLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.logoutSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.logoutFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  }))
);
