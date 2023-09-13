import { createAction } from '@ngrx/store';

import { Product } from '@commons/models/product.model';

export const productLoadAction = createAction(
  '[MAIN CONTAINER / API] Load Product',
  (
    typeAccount: string,
    id: string,
    nameAccount: string,
    nameSmall: string,
    product: Product
  ) => ({
    typeAccount,
    id,
    nameAccount,
    product,
    nameSmall
  })
);
export const detailProductLoadAction = createAction(
  '[DETAIL / API] Load Product',
  (typeAccount: string, id: string) => ({
    typeAccount,
    id
  })
);
export const productSuccessAction = createAction(
  '[MAIN CONTAINER / API] Success Product',
  (typeAccount: string, id: string, product: Product) => ({
    typeAccount,
    id,
    product
  })
);
export const productFailAction = createAction(
  '[MAIN CONTAINER / API] Fail Product',
  (typeAccount: string, id: string, errorMessage: string) => ({
    typeAccount,
    id,
    errorMessage
  })
);

export const toogleHiddenIdProductAction = createAction(
  '[MAIN CONTAINER / PRODUCT] Toogle Hidden Id Product',
  (typeAccount: string, id: string) => ({
    typeAccount,
    id
  })
);
