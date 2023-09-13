import { createAction } from '@ngrx/store';

import { IProductsPack } from '@commons/entities/products.entities';
import { IOtherProductsBodyService } from '@modules/home/entities/otherProducts.entities';

export const otherProductLoad = createAction(
  '[HOME / API] Other Products Load',
  (bank: IOtherProductsBodyService) => ({ bank })
);

export const otherProductSuccess = createAction(
  '[HOME / API] Other Products Success',
  (products: IProductsPack, nameBank: string) => ({
    products,
    nameBank
  })
);

export const otherProductFail = createAction(
  '[HOME / API] Other Products Fail',
  (nameBank: string, errorMessage: string) => ({
    nameBank,
    errorMessage
  })
);

export const otherProductShow = createAction(
  '[HOME] Other Products toggle',
  (show: boolean) => ({ show })
);
