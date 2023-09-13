import { createReducer, on } from '@ngrx/store';

import {
  stocksPeriodFail,
  stocksPeriodLoad,
  stocksPeriodSuccess
} from '@modules/main-container/store/actions/stocks.action';
import { IStocksPeriodState } from '@modules/main-container/store/states/main-container.state';

export const initStocksPeriod: IStocksPeriodState = {
  information: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false
};

export const stocksPeriodReducer = createReducer(
  initStocksPeriod,
  on(stocksPeriodLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: ''
    };
  }),
  on(stocksPeriodSuccess, (state, { information }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      information
    };
  }),
  on(stocksPeriodFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage
    };
  })
);
