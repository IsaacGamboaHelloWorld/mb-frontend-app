import { createReducer, on } from '@ngrx/store';

import {
  stocksTypeFail,
  stocksTypeLoad,
  stocksTypeSuccess
} from '@modules/main-container/store/actions/stocks.action';
import { IStocksTypeState } from '@modules/main-container/store/states/main-container.state';

export const initStocksType: IStocksTypeState = {
  information: null,
  loading: false,
  loaded: false,
  error: false
};

export const stocksTypeReducer = createReducer(
  initStocksType,
  on(stocksTypeLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: ''
    };
  }),
  on(stocksTypeSuccess, (state, { information }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      information
    };
  }),
  on(stocksTypeFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage
    };
  })
);
