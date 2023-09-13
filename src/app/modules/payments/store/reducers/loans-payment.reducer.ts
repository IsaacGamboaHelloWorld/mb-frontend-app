import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/loans-payment.action';
import { ILoanPaymentState } from '@modules/payments/store/payments.state';

export const initPaymentLoan: ILoanPaymentState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePaymentLoan = createReducer(
  initPaymentLoan,
  on(actions.paymentLoanLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.paymentLoanSuccessAction, (state, { information }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    information
  })),
  on(
    actions.paymentLoanFailAction,
    actions.paymentLoanFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(actions.paymentLoanResetAction, (state) => initPaymentLoan)
);
