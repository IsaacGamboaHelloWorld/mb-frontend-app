import { createAction } from '@ngrx/store';
import {
  IPocket,
  IPocketDetailRequest
} from '@commons/entities/pockets.entities';

export const pocketDetailLoadAction = createAction(
  '[MAIN CONTAINER / API] Pocket Detail Load',
  (basicPocket: IPocketDetailRequest) => ({ basicPocket })
);
export const pocketDetailByProductLoadAction = createAction(
  '[MAIN CONTAINER / API] Pocket Detail Load',
  (productId: string, productType: string) => ({ productId, productType })
);
export const pocketDetailCancelAction = createAction(
  '[MAIN CONTAINER] Pocket Detail Cancel'
);
export const pocketDetailSuccessAction = createAction(
  '[MAIN CONTAINER / API] Pocket Detail Success',
  (basicPocket: IPocketDetailRequest, pocket: IPocket) => ({
    basicPocket,
    pocket
  })
);
export const pocketDetailFailAction = createAction(
  '[MAIN CONTAINER / API] Pocket Detail Fail',
  (basicPocket: IPocketDetailRequest, errorMessage: string) => ({
    basicPocket,
    errorMessage
  })
);
export const pocketDetailResetAction = createAction(
  '[MAIN CONTAINER / API] Pocket Detail Reset'
);
