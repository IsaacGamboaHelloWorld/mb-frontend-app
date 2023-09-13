export interface IStocksPeriod {
  periods: IStockPeriod[];
  success: true;
  errorMessage: string;
}

export interface IStocksType {
  stockTypes: IStockType[];
  success: true;
  errorMessage: string;
}

export interface IStockType {
  id: string;
  value: string;
}

export interface IStockPeriod {
  id: string;
  value: number;
}

export interface IStocks {
  balanceDescription: string;
  amount: string;
  date: string;
  dateDescription: string;
  numberBaseStocks: string;
}

export interface IDividend {
  channelCode: string;
  accountId: string;
  accountType: string;
  bankId: string;
  amount: string;
}

export interface IStocksAvalAll {
  stocksAval: IStocks[];
  dividends: IDividend[];
  success: boolean;
  errorMessage: string;
}

export interface IStocksAllParams {
  period: string;
  stockType: string;
}
