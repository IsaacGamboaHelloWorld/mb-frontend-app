import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/taxes-payment.action';
import { ITaxesPaymentState } from '@modules/payments/store/payments.state';

export const initTaxesPayment: ITaxesPaymentState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureTaxesPayment = createReducer(
  initTaxesPayment,
  on(actions.taxesPaymentLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.taxesPaymentSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(
    actions.taxesPaymentFailAction,
    actions.taxesPaymentFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(actions.taxesPaymentResetAction, () => initTaxesPayment)
);
