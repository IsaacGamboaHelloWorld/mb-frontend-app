import { createReducer, on } from '@ngrx/store';

import { IPayRollLoansState } from '@modules/main-container/store/states/products.state';
import * as actions from '@modules/main-container/store/actions/pay-roll-loans.action';

export const initRollLoans: IPayRollLoansState = {
  rollLoans: [],
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureRollLoans = createReducer(
  initRollLoans,
  on(actions.rollLoansLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.rollLoansSuccessAction, (state, { rollLoans }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    rollLoans
  })),
  on(actions.rollLoansFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.rollLoansResetAction, () => initRollLoans)
);
