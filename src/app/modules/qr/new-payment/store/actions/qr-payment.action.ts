import { createAction } from '@ngrx/store';

import {
  IQrAnnulmentService,
  IQrPaymentBody
} from '@modules/qr/new-payment/entities/qr.entities';

export const qrPaymentLoadAction = createAction(
  '[QR PAYMENT / API] Qr Payment Load',
  (body: IQrPaymentBody) => ({ body })
);
export const qrPaymentSuccessAction = createAction(
  '[QR PAYMENT / API] Qr Payment Success',
  (information: IQrAnnulmentService) => ({ information })
);
export const qrPaymentFailAction = createAction(
  '[QR PAYMENT / API] Qr Payment Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const qrPaymentResetAction = createAction(
  '[QR PAYMENT] Qr Payment Reset'
);
