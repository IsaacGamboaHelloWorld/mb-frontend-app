import { createAction } from '@ngrx/store';

import {
  ITaxesAgreement,
  ITaxesAgreementsRequest
} from '@modules/payments/entities/tax-payment.entities';

export const taxesAgreementsLoadAction = createAction(
  '[TAX PAYMENT / API] Taxes Agreements Load',
  (request: ITaxesAgreementsRequest) => ({ request })
);
export const taxesAgreementsSuccessAction = createAction(
  '[TAX PAYMENT / API] Taxes Agreements Success',
  (taxesAgreements: ITaxesAgreement[]) => ({ taxesAgreements })
);
export const taxesAgreementsFailAction = createAction(
  '[TAX PAYMENT / API] Taxes Agreements Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const taxesAgreementsResetAction = createAction(
  '[TAX PAYMENT] Taxes Agreements Reset'
);
