import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/documents/statements/store/actions/periods.action';
import { IPeriods } from '@modules/documents/statements/store/statements.state';

export const initPeriod: IPeriods = {
  periods: [],
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePeriods = createReducer(
  initPeriod,
  on(actions.periodLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.periodSuccessAction, (state, { periods }) => ({
    ...state,
    completed: true,
    error: false,
    loading: false,
    periods
  })),
  on(actions.periodFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.periodResetAction, (state) => initPeriod)
);
