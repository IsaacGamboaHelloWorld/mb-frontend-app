import { createAction } from '@ngrx/store';

import {
  ITaxesPaymentRequest,
  ITaxesPaymentResponse
} from '@modules/payments/entities/tax-payment.entities';

export const taxesPaymentLoadAction = createAction(
  '[TAX PAYMENT / API] Taxes Payment Load',
  (request: ITaxesPaymentRequest) => ({ request })
);
export const taxesPaymentSuccessAction = createAction(
  '[TAX PAYMENT / API] Taxes Payment Success',
  (response: ITaxesPaymentResponse) => ({ response })
);
export const taxesPaymentFailAction = createAction(
  '[TAX PAYMENT / API] Taxes Payment Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const taxesPaymentFailActionWithoutToast = createAction(
  '[TAX PAYMENT / API] Taxes Payment Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const taxesPaymentResetAction = createAction(
  '[TAX PAYMENT] Taxes Payment Reset'
);
