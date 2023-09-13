import { createAction } from '@ngrx/store';
import {
  IDividend,
  IStockPeriod,
  IStocks,
  IStocksAllParams,
  IStockType
} from '@modules/main-container/entities/stocks.interface';

export const stocksTypeLoad = createAction(
  '[MAIN CONTAINER / API] Stocks Type Load'
);

export const stocksTypeFail = createAction(
  '[MAIN CONTAINER / API] Stocks Type Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const stocksTypeSuccess = createAction(
  '[MAIN CONTAINER / API] Stocks Type Success',
  (information: IStockType[]) => ({ information })
);

export const stocksPeriodLoad = createAction(
  '[MAIN CONTAINER / API] Stocks Period Load'
);

export const stocksPeriodFail = createAction(
  '[MAIN CONTAINER / API] Stocks Period Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const stocksPeriodSuccess = createAction(
  '[MAIN CONTAINER / API] Stocks Period Success',
  (information: IStockPeriod[]) => ({ information })
);

export const stocksAllLoad = createAction(
  '[MAIN CONTAINER / API] Stocks All Load',
  (params: IStocksAllParams) => ({ params })
);

export const stocksAllFail = createAction(
  '[MAIN CONTAINER / API] Stocks All Fail'
);

export const stocksAllSuccess = createAction('[HOME / API] Stocks All Success');
