import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/qr-products.action';
import { IQrProductsState } from '@modules/main-container/store/states/main-container.state';

export const initProductsQr: IQrProductsState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureQrProducts = createReducer(
  initProductsQr,
  on(actions.qrProductsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.qrProductsSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.qrProductsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.qrProductsResetAction, (state) => initProductsQr)
);
