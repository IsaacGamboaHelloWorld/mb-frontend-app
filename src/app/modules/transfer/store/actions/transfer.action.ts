import { createAction } from '@ngrx/store';

import {
  INewTransferRespond,
  INewTransferService
} from '@modules/transfer/entities/transfer.entities';

export const newTransferLoadAction = createAction(
  '[NEW TRANSFER / API] New Transfer Load',
  (information: INewTransferService) => ({ information })
);
export const newTransferSuccessAction = createAction(
  '[NEW TRANSFER / API] New Transfer Success',
  (respond: INewTransferRespond) => ({ respond })
);
export const newTransferFailAction = createAction(
  '[NEW TRANSFER / API] New Transfer Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const newTransferFailActionWithoutToast = createAction(
  '[NEW TRANSFER / API] New Transfer Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const newTransferResetAction = createAction(
  '[NEW TRANSFER] New Transfer Reset'
);

export const newTransferNotRegisteredLoadAction = createAction(
  '[NEW TRANSFER / API] New Transfer Not Registered Load',
  (information: INewTransferService) => ({ information })
);
export const newTransferNotRegisteredSuccessAction = createAction(
  '[NEW TRANSFER / API] New Transfer Not Registered Success',
  (respond: INewTransferRespond) => ({ respond })
);
export const newTransferNotRegisteredFailAction = createAction(
  '[NEW TRANSFER / API] New Transfer Not Registered Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const newTransferNotRegisteredResetAction = createAction(
  '[NEW TRANSFER] New Transfer Not Registered Reset'
);
