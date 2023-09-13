import { Product } from '@commons/models/product.model';

export interface IFormOneRecharge {
  from: Product;
  to: string;
  phone_number: number;
  amount: number | string;
}
