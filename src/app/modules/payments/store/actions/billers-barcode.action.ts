import { createAction } from '@ngrx/store';

import {
  IBillerBarcode,
  IBillerPaymentBarcode
} from '@modules/payments/entities/billers.entities';

export const barcodeBillerLoadAction = createAction(
  '[PAYMENT PUBLIC / API] Barcode Billers Load',
  (body: IBillerBarcode) => ({ body })
);
export const barcodeBillerSuccessAction = createAction(
  '[PAYMENT PUBLIC / API] Barcode Billers Success',
  (information: IBillerPaymentBarcode) => ({ information })
);
export const barcodeBillerFailAction = createAction(
  '[PAYMENT PUBLIC / API] Barcode Billers Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const barcodeBillerResetAction = createAction(
  '[PAYMENT PUBLIC] Barcode Billers Reset'
);
