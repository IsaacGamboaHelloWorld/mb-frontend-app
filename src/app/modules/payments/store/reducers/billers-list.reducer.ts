import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/billers-list.action';
import { IListBillerState } from '@modules/payments/store/payments.state';

export const initListBiller: IListBillerState = {
  information: [],
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureListBillerTransfer = createReducer(
  initListBiller,
  on(actions.listBillerLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.listBillerSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.listBillerFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.listBillerResetAction, (state) => initListBiller)
);
