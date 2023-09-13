import { createReducer, on } from '@ngrx/store';

import { IMovePocketState } from '@modules/pockets/store/pockets.state';
import * as actions from '@modules/pockets/store/actions/move-pockets.action';

export const initMovePocket: IMovePocketState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureMovePocket = createReducer(
  initMovePocket,
  on(actions.movePocketLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.movePocketSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(actions.movePocketFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.movePocketResetAction, () => initMovePocket)
);
