import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/billers-search.action';
import { ISearchBillerState } from '@modules/payments/store/payments.state';

export const initSearchBiller: ISearchBillerState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureSearchBiller = createReducer(
  initSearchBiller,
  on(actions.searchBillerLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.searchBillerSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.searchBillerFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.searchBillerResetAction, (state) => initSearchBiller)
);
