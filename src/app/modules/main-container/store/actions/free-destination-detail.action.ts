import { createAction } from '@ngrx/store';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';

export const freeDestinationDetailLoadAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Detail Load',
  (accountId: string) => ({ accountId })
);
export const freeDestinationDetailSuccessAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Detail Success',
  (accountId: string, freeDestinationDetail: IFreeDestinationDetail) => ({
    accountId,
    freeDestinationDetail
  })
);
export const freeDestinationDetailFailAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Detail Fail',
  (accountId: string, errorMessage: string) => ({
    accountId,
    errorMessage
  })
);
export const freeDestinationDetailResetAction = createAction(
  '[MAIN CONTAINER / API] Free Destination Detail Reset'
);
