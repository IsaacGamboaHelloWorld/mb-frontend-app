import { IProductsPack } from '@commons/entities/products.entities';
import { IPocketsByProduct } from '@commons/entities/pockets.entities';
import { IPayrollLoans } from '@app/commons/entities/pay-rolls-loans.entities';
import { IProductNickname } from '@modules/main-container/entities/main-products.entities';
import { IFreeDestinationCredit } from '@modules/main-container/entities/free-destination.entities';

export interface IProductsState {
  products: IProductsPack;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPocketsState {
  data: IPocketsByProduct[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPayRollLoansState {
  rollLoans: IPayrollLoans[];
  errorMessage: string;
  loading: boolean;
  completed: boolean;
  error: boolean;
}

export interface INicknamesState {
  nicknames: IProductNickname[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IFreeDestinationState {
  products: IFreeDestinationCredit[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
