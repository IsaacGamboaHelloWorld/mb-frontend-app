import { createAction } from '@ngrx/store';
import { IFreeDestinationCredit } from '@modules/main-container/entities/free-destination.entities';

export const freeDestinationLoadAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Load'
);
export const freeDestinationCancelAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Cancel'
);
export const freeDestinationSuccessAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Success',
  (products: IFreeDestinationCredit[]) => ({ products })
);
export const freeDestinationFailAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const freeDestinationResetAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Reset'
);
