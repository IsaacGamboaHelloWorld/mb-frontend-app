import { IProductsPack } from '@commons/entities/products.entities';

export const homeFeatureName = 'homeModuleState';

export interface IOtherProduct {
  key: string;
  products?: IProductsPack;
  loading?: boolean;
  completed?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface IOtherProductsState {
  products: IOtherProduct[];
  toggle: boolean;
}

export interface IHomeState {
  otherProducts: IOtherProductsState;
  otherCredits: {
    toggleCredits: boolean;
  };
}
