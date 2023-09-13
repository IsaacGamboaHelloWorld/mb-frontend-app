import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/qr/new-payment/store/actions/qr-annulment.action';
import { IQrAnnulmentState } from '@modules/qr/new-payment/store/qr.state';

export const initQrAnnulment: IQrAnnulmentState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureQrAnnulment = createReducer(
  initQrAnnulment,
  on(actions.qrAnnulmentLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.qrAnnulmentSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.qrAnnulmentFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.qrAnnulmentResetAction, (state) => initQrAnnulment)
);
