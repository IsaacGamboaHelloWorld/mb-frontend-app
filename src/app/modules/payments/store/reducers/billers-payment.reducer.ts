import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/billers-payment.action';
import { IPayBillerState } from '@modules/payments/store/payments.state';

export const initPaymentBiller: IPayBillerState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePayBillerTransfer = createReducer(
  initPaymentBiller,
  on(actions.paymentBillerLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.paymentBillerSuccessAction, (state, { information }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    information
  })),
  on(
    actions.paymentBillerFailAction,
    actions.paymentBillerFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(actions.paymentBillerResetAction, (state) => initPaymentBiller)
);
