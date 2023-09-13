import { createAction } from '@ngrx/store';

import { IQrInfoBody } from '@modules/qr/new-payment/entities/qr.entities';

export const qrInfoLoadAction = createAction(
  '[QR INFO / API] Qr Info Load',
  (body: IQrInfoBody) => ({ body })
);
export const qrInfoSuccessAction = createAction(
  '[QR INFO / API] Qr Info Success',
  (information: any) => ({ information })
);
export const qrInfoFailAction = createAction(
  '[QR INFO / API] Qr Info Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const qrInfoResetAction = createAction('[QR INFO] Qr Info Reset');
