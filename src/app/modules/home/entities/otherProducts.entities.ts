import { IProductsPack } from '@commons/entities/products.entities';
import { Product } from '@commons/models/product.model';

export interface IRespondServiceProducts {
  products: IProductsPack;
  errorMessage: string;
  success: boolean;
}

export interface IOtherProductsBodyService {
  requestId: number;
  companyId: string;
  currentSystemDate: string;
  entitySearch: string;
}

export interface IRespOtherProducts {
  [key: string]: {
    errorMessage: string;
    success: boolean;
    products: IProductsPack;
  };
}

export interface ICardOther {
  first: boolean;
  total: number;
  information: Product;
}
