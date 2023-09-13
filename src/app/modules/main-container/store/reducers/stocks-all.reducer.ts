import { createReducer, on } from '@ngrx/store';

import {
  stocksAllFail,
  stocksAllLoad,
  stocksAllSuccess
} from '@modules/main-container/store/actions/stocks.action';
import { IStocksAllState } from '@modules/main-container/store/states/main-container.state';

export const initStocksAll: IStocksAllState = {
  loading: false,
  loaded: false,
  error: false
};

export const stocksAllReducer = createReducer(
  initStocksAll,
  on(stocksAllLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: ''
    };
  }),
  on(stocksAllSuccess, (state) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true
    };
  }),
  on(stocksAllFail, (state) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true
    };
  })
);
