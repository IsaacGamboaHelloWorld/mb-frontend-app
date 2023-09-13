import { createAction } from '@ngrx/store';

import { IProductsPack } from '@commons/entities/products.entities';

export const productsLoadAction = createAction(
  '[MAIN CONTAINER / API] Products Load'
);
export const productsCancelAction = createAction(
  '[MAIN CONTAINER] Products Cancel'
);
export const productsSuccessAction = createAction(
  '[MAIN CONTAINER / API] Products Success',
  (products: IProductsPack) => ({ products })
);
export const productsFailAction = createAction(
  '[MAIN CONTAINER / API] Products Fail',
  (errorMessage: string) => ({ errorMessage })
);
