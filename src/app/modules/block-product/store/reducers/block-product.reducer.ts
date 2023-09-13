import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/block-product/store/actions/block-product.action';
import { IBlockProductState } from '@modules/block-product/store/block-product.state';

export const initBlockProduct: IBlockProductState = {
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureBlockProduct = createReducer(
  initBlockProduct,
  on(actions.blockProductLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.blockProductSuccessAction, (state) => ({
    ...state,
    loading: false,
    completed: true,
    error: false
  })),
  on(
    actions.blockProductFailAction,
    actions.blockProductFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(actions.blockProductResetAction, (state) => initBlockProduct)
);
