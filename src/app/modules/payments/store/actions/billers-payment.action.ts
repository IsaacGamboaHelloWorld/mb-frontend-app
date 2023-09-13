import { createAction } from '@ngrx/store';

import {
  INewPaymentBillerService,
  IPaymentBillsResp
} from '@modules/payments/entities/billers.entities';

export const paymentBillerLoadAction = createAction(
  '[PAYMENT PUBLIC / API] Payment Biller Load',
  (body: INewPaymentBillerService) => ({ body })
);
export const paymentBillerSuccessAction = createAction(
  '[PAYMENT PUBLIC / API] Payment Biller Success',
  (information: IPaymentBillsResp) => ({ information })
);
export const paymentBillerFailAction = createAction(
  '[PAYMENT PUBLIC / API] Payment Biller Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const paymentBillerFailActionWithoutToast = createAction(
  '[PAYMENT PUBLIC / API] Payment Biller Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const paymentBillerResetAction = createAction(
  '[PAYMENT PUBLIC] Payment Biller Reset'
);
