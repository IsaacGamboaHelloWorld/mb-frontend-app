import { createAction } from '@ngrx/store';

import { IMovement } from '@modules/detail/product-detail/entities/movements.entities';

export const movementsLoadAction = createAction(
  '[DETAIL PRODUCT / API] Movements Load',
  (typeAccount: string, id: string, from: string, to: string) => ({
    typeAccount,
    id,
    from,
    to
  })
);
export const movementsResetAction = createAction(
  '[DETAIL PRODUCT] Movements Reset'
);
export const movementsSuccessAction = createAction(
  '[DETAIL PRODUCT / API] Movements Success',
  (information: IMovement) => ({ information })
);
export const movementsFailAction = createAction(
  '[DETAIL PRODUCT / API] Movements Fail',
  (errorMessage: string) => ({ errorMessage })
);
