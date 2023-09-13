import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/loans-registered.action';
import { IRegisteredLoansState } from '@modules/payments/store/payments.state';

export const initRegisteredLoans: IRegisteredLoansState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureRegisteredLoans = createReducer(
  initRegisteredLoans,
  on(actions.registeredLoansLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.registeredLoansSuccessAction, (state, { registeredLoans }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    information: registeredLoans
  })),
  on(actions.registeredLoansFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.registeredLoansResetAction, (state) => initRegisteredLoans)
);
