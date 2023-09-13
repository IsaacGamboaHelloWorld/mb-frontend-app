import { createReducer, on } from '@ngrx/store';

import { IDeletePocketState } from '@modules/pockets/store/pockets.state';
import * as actions from '@modules/pockets/store/actions/delete-pockets.action';

export const initDeletePocket: IDeletePocketState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureDeletePocket = createReducer(
  initDeletePocket,
  on(actions.deletePocketLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.deletePocketSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(actions.deletePocketFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.deletePocketResetAction, () => initDeletePocket)
);
