import { Product } from '@commons/models/product.model';

export interface IAccountBalance {
  amount: number;
  currencyCode: string;
  rate: string;
  description: string;
  lastTransactionDate: string;
}

export class IAccountType {
  accountIdentifier: string;
  productType: string;
  bank?: string;
  currencyCode?: string;
  productName?: string;
}

export interface IProductsPack {
  [key: string]: Product[];
}

export interface IProductCardSmall {
  productName: string;
  accountIdentifier: string;
  availableBalanceLabel: string;
  availableBalance: string;
  icon?: string;
  img?: string;
}
