import {
  IFreeDestinationState,
  INicknamesState,
  IPayRollLoansState,
  IPocketsState,
  IProductsState
} from '@modules/main-container/store/states/products.state';
import { Product } from '@commons/models/product.model';
import { ITuplus } from '@modules/main-container/entities/tuplus.entities';
import {
  IStockPeriod,
  IStockType
} from '@modules/main-container/entities/stocks.interface';
import { IDataUser } from '@modules/main-container/entities/user.entities';
import {
  IQrInfo,
  IQrProduct
} from '@modules/qr/new-payment/entities/qr.entities';
import { IStorageItem } from '@commons/entities/global.entities';
import { IPocket } from '@commons/entities/pockets.entities';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';

export const mainContainerFeatureName = 'mainContainerModuleState';

export interface IMainContainerState {
  listProducts: IProductsState;
  productsDetail: Product[];
  nicknames: INicknamesState;
  pockets: IPocketsState;
  pocketsDetail: IPocket[];
  hiddenNavBar: boolean;
  tuplus: ITuplusState;
  payRollLoans: IPayRollLoansState;
  freeDestination: IFreeDestinationState;
  freeDestinationDetail: IFreeDestinationDetail[];
  stocks: IStocksState;
  dataUser: IDataUserState;
  qrInfo: IQrInfoState;
  qrProducts: IQrProductsState;
  activeCreditCard: IStorageItem;
}

export interface IStocksAllState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export interface IQrProductsState {
  information: IQrProduct[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IQrInfoState {
  information: IQrInfo;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IStocksPeriodState {
  information: IStockPeriod[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export interface IStocksTypeState {
  information: IStockType[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export type IStocksState = Readonly<{
  all: IStocksAllState;
  period: IStocksPeriodState;
  type: IStocksTypeState;
}>;

export interface ITuplusState {
  information: ITuplus;
  errorMessage: string;
  loading: boolean;
  completed: boolean;
  error: boolean;
}

export interface IDataUserState {
  information: IDataUser;
  errorMessage: string;
  loading: boolean;
  completed: boolean;
  error: boolean;
}
