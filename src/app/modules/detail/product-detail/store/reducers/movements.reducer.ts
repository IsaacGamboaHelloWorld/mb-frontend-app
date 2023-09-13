import { createReducer, on } from '@ngrx/store';

import { IMovementsState } from '@modules/detail/product-detail/store/states/movements.state';
import * as actions from '@modules/detail/product-detail/store/actions/movements.action';

export const initMovements: IMovementsState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureMovements = createReducer(
  initMovements,
  on(actions.movementsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.movementsSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    information
  })),
  on(actions.movementsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.movementsResetAction, (state) => initMovements)
);
