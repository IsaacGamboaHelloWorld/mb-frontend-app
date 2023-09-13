import { createReducer, on } from '@ngrx/store';

import { IEditPocketState } from '@modules/pockets/store/pockets.state';
import * as actions from '@modules/pockets/store/actions/edit-pockets.action';

export const initEditPocket: IEditPocketState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureEditPocket = createReducer(
  initEditPocket,
  on(actions.editPocketLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.editPocketSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(actions.editPocketFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.editPocketResetAction, () => initEditPocket)
);
