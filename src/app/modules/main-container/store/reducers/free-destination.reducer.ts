import { createReducer, on } from '@ngrx/store';

import { IFreeDestinationState } from '@modules/main-container/store/states/products.state';
import * as actions from '@modules/main-container/store/actions/free-destination.action';

export const initFreeDestinationAll: IFreeDestinationState = {
  products: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureFreeDestination = createReducer(
  initFreeDestinationAll,
  on(actions.freeDestinationLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.freeDestinationSuccessAction, (state, { products }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    products
  })),
  on(actions.freeDestinationFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.freeDestinationResetAction, () => initFreeDestinationAll)
);
