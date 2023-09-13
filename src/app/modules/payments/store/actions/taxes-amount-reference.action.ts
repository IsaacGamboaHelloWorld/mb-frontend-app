import { createAction } from '@ngrx/store';

import {
  ITaxesAmountReferenceRequest,
  ITaxesAmountReferenceResponse
} from '@modules/payments/entities/tax-payment.entities';

export const taxesAmountReferenceLoadAction = createAction(
  '[TAX PAYMENT / API] Taxes Amount Reference Load',
  (request: ITaxesAmountReferenceRequest) => ({ request })
);
export const taxesAmountReferenceSuccessAction = createAction(
  '[TAX PAYMENT / API] Taxes Amount Reference Success',
  (amountReference: ITaxesAmountReferenceResponse) => ({ amountReference })
);
export const taxesAmountReferenceFailAction = createAction(
  '[TAX PAYMENT / API] Taxes Amount Reference Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const taxesAmountReferenceResetAction = createAction(
  '[TAX PAYMENT] Taxes Amount Reference Reset'
);
