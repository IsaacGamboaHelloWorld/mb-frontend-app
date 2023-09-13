import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/qr/new-payment/store/actions/qr-payment.action';
import { IQrPaymentState } from '@modules/qr/new-payment/store/qr.state';

export const initQrPayment: IQrPaymentState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureQrPayment = createReducer(
  initQrPayment,
  on(actions.qrPaymentLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.qrPaymentSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.qrPaymentFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.qrPaymentResetAction, (state) => initQrPayment)
);
