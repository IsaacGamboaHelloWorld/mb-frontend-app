import { createReducer, on } from '@ngrx/store';

import { ICreatePocketState } from '@modules/pockets/store/pockets.state';
import * as actions from '@modules/pockets/store/actions/create-pockets.action';

export const initCreatePocket: ICreatePocketState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureCreatePocket = createReducer(
  initCreatePocket,
  on(actions.createPocketLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.createPocketSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(actions.createPocketFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.createPocketResetAction, () => initCreatePocket)
);
