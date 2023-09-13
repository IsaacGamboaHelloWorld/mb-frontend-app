import { createAction } from '@ngrx/store';

import { IBlockProductBody } from '@modules/block-product/entities/block.entities';

export const blockProductLoadAction = createAction(
  '[BLOCK PRODUCT / API] Block Product Load',
  (body: IBlockProductBody) => ({ body })
);

export const blockProductSuccessAction = createAction(
  '[BLOCK PRODUCT / API] Block Product Success'
);
export const blockProductFailAction = createAction(
  '[BLOCK PRODUCT / API] Block Product Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const blockProductFailActionWithoutToast = createAction(
  '[BLOCK PRODUCT / API] Block Product Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const blockProductResetAction = createAction(
  '[BLOCK PRODUCT] Block Product Reset'
);
