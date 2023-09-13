import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/products.action';
import { IProductsState } from '@modules/main-container/store/states/products.state';

export const initProducts: IProductsState = {
  products: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureProducts = createReducer(
  initProducts,
  on(actions.productsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.productsSuccessAction, (state, { products }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    products
  })),
  on(actions.productsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  }))
);
