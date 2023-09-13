import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/data-user';
import { IDataUserState } from '@modules/main-container/store/states/main-container.state';

export const initDataUser: IDataUserState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureDataUser = createReducer(
  initDataUser,
  on(actions.dataUserLoad, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.dataUserSuccess, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.dataUserFail, (state) => ({
    ...state,
    loading: false,
    completed: false,
    error: true
  }))
);
