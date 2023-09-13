import { createReducer, on } from '@ngrx/store';

import { IPocketsState } from '@modules/main-container/store/states/products.state';
import * as actions from '@modules/main-container/store/actions/pockets.action';

export const initPockets: IPocketsState = {
  data: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePockets = createReducer(
  initPockets,
  on(actions.pocketsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.pocketsSuccessAction, (state, { pockets }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    data: pockets
  })),
  on(actions.pocketsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.pocketsResetAction, () => initPockets)
);
