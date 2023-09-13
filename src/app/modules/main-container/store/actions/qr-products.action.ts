import { createAction } from '@ngrx/store';

import { IQrProductsBody } from '@modules/qr/new-payment/entities/qr.entities';

export const qrProductsLoadAction = createAction(
  '[QR PRODUCTS / API] Qr Products Load',
  (body: IQrProductsBody) => ({ body })
);
export const qrProductsSuccessAction = createAction(
  '[QR PRODUCTS / API] Qr Products Success',
  (information: any) => ({ information })
);
export const qrProductsFailAction = createAction(
  '[QR PRODUCTS / API] Qr Products Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const qrProductsResetAction = createAction(
  '[QR PRODUCTS] Qr Products Reset'
);
