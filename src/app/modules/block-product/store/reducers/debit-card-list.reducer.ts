import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/block-product/store/actions/debit-cards.action';
import { IDebitCardListState } from '@modules/block-product/store/block-product.state';

export const initDebitCardList: IDebitCardListState = {
  data: null,
  loading: false,
  loaded: false,
  error: false
};

export const debitCardListReducer = createReducer(
  initDebitCardList,
  on(actions.debitCardListLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: ''
    };
  }),
  on(actions.debitCardListSuccessAction, (state, { data }) => {
    return {
      data,
      error: false,
      loading: false,
      loaded: true
    };
  }),
  on(actions.debitCardListFailAction, (state, { error }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: error
    };
  }),
  on(actions.debitCardListResetAction, (state) => {
    return initDebitCardList;
  })
);
