import { createAction } from '@ngrx/store';

import {
  ITaxesCitiesRequest,
  ITaxesCity
} from '@modules/payments/entities/tax-payment.entities';

export const taxesCitiesLoadAction = createAction(
  '[TAX PAYMENT / API] Taxes Cities Load',
  (request: ITaxesCitiesRequest) => ({ request })
);
export const taxesCitiesSuccessAction = createAction(
  '[TAX PAYMENT / API] Taxes Cities Success',
  (listCities: ITaxesCity[]) => ({ listCities })
);
export const taxesCitiesFailAction = createAction(
  '[TAX PAYMENT / API] Taxes Cities Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const taxesCitiesResetAction = createAction(
  '[TAX PAYMENT] Taxes Cities Reset'
);
