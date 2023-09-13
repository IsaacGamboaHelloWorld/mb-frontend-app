import { createAction } from '@ngrx/store';

import { IPaymentBills } from '@modules/payments/entities/billers.entities';

export const listBillerLoadAction = createAction(
  '[PAYMENT PUBLIC / API] List Billers Load'
);
export const listBillerSuccessAction = createAction(
  '[PAYMENT PUBLIC / API] List Billers Success',
  (information: IPaymentBills[]) => ({ information })
);
export const listBillerFailAction = createAction(
  '[PAYMENT PUBLIC / API] List Billers Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const listBillerResetAction = createAction(
  '[PAYMENT PUBLIC] List Billers Reset'
);
