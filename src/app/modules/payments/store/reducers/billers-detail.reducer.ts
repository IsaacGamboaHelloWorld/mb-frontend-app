import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/billers-detail.action';
import { IDetailBillerState } from '@modules/payments/store/payments.state';

export const initDetailBiller: IDetailBillerState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureDetailBiller = createReducer(
  initDetailBiller,
  on(actions.detailBillerLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.detailBillerSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.detailBillerFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.detailBillerResetAction, (state) => initDetailBiller)
);
