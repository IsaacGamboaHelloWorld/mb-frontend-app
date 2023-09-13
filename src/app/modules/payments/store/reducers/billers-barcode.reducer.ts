import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/billers-barcode.action';
import { IBarcodeBillerState } from '@modules/payments/store/payments.state';

export const initBarcodeBiller: IBarcodeBillerState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureBarcodeBiller = createReducer(
  initBarcodeBiller,
  on(actions.barcodeBillerLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.barcodeBillerSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.barcodeBillerFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.barcodeBillerResetAction, (state) => initBarcodeBiller)
);
