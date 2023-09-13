import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/pila-payment.action';
import { IPilaPaymentState } from '@modules/payments/store/payments.state';

export const initPilaPayment: IPilaPaymentState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePilaPayment = createReducer(
  initPilaPayment,
  on(actions.pilaPaymentLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.pilaPaymentSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(
    actions.pilaPaymentFailAction,
    actions.pilaPaymentFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(actions.pilaPaymentResetAction, () => initPilaPayment)
);
