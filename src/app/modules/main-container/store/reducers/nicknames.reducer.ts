import { createReducer, on } from '@ngrx/store';

import { INicknamesState } from '@modules/main-container/store/states/products.state';
import * as actions from '@modules/main-container/store/actions/nicknames.action';

export const initNicknames: INicknamesState = {
  nicknames: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureNicknames = createReducer(
  initNicknames,
  on(actions.nicknamesLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.nicknamesSuccessAction, (state, { nicknames }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    nicknames
  })),
  on(actions.nicknamesFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.nicknamesResetAction, () => initNicknames)
);
