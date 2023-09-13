import { createAction } from '@ngrx/store';

import { IPocketsByProduct } from '@commons/entities/pockets.entities';

export const pocketsLoadAction = createAction(
  '[MAIN CONTAINER / API] Pockets Load'
);
export const pocketsCancelAction = createAction(
  '[MAIN CONTAINER / API] Pockets Cancel'
);
export const pocketsSuccessAction = createAction(
  '[MAIN CONTAINER / API] Pockets Success',
  (pockets: IPocketsByProduct[]) => ({ pockets })
);
export const pocketsFailAction = createAction(
  '[MAIN CONTAINER / API] Pockets Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const pocketsResetAction = createAction(
  '[MAIN CONTAINER / API] Pockets Reset'
);
