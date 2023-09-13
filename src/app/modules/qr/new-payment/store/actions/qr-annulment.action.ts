import { createAction } from '@ngrx/store';

import {
  IQrAnnulmentService,
  IQrInfoBody
} from '@modules/qr/new-payment/entities/qr.entities';

export const qrAnnulmentLoadAction = createAction(
  '[QR ANNULMENT / API] Qr Annulment Load',
  (body: IQrInfoBody) => ({ body })
);
export const qrAnnulmentSuccessAction = createAction(
  '[QR ANNULMENT / API] Qr Annulment Success',
  (information: IQrAnnulmentService) => ({ information })
);
export const qrAnnulmentFailAction = createAction(
  '[QR ANNULMENT / API] Qr Annulment Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const qrAnnulmentResetAction = createAction(
  '[QR ANNULMENT] Qr Annulment Reset'
);
