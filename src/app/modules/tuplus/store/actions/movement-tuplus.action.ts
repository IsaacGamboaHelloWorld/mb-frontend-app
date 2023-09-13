import { createAction } from '@ngrx/store';

import {
  IMovementTuplus,
  IRequestMovements
} from '@modules/tuplus/entities/movement-tuplus.entities';

export const movementsTuplusLoadAction = createAction(
  '[DETAIL PRODUCT / API] Movements Load',
  (requestBody: IRequestMovements) => ({
    requestBody
  })
);
export const movementsTuplusResetAction = createAction(
  '[DETAIL PRODUCT] Movements Reset'
);
export const movementsTuplusSuccessAction = createAction(
  '[DETAIL PRODUCT / API] Movements Success',
  (information: IMovementTuplus) => ({ information })
);
export const movementsTuplusFailAction = createAction(
  '[DETAIL PRODUCT / API] Movements Fail',
  (errorMessage: string) => ({ errorMessage })
);
