import { createAction } from '@ngrx/store';

import {
  IConsTransferResp,
  ICostTransferService
} from '@modules/transfer/entities/cost-transfer.entities';

export const costTransferLoadAction = createAction(
  '[NEW TRANSFER / API] Cost Transfer Load',
  (information: ICostTransferService) => ({ information })
);
export const costTransferSuccessAction = createAction(
  '[NEW TRANSFER / API] Cost Transfer Success',
  (respond: IConsTransferResp) => ({ respond })
);
export const costTransferFailAction = createAction(
  '[NEW TRANSFER / API] Cost Transfer Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const costTransferResetAction = createAction(
  '[NEW TRANSFER] Cost Transfer Reset'
);
