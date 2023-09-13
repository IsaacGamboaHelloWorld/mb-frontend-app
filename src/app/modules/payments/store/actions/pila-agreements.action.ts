import { createAction } from '@ngrx/store';

import {
  IPilaAgreement,
  IPilaAgreementsAvailableRequest
} from '@modules/payments/entities/pila-payment.entities';

export const pilaAgreementsLoadAction = createAction(
  '[PILA PAYMENT / API] Pila Agreements Available Load',
  (request: IPilaAgreementsAvailableRequest) => ({ request })
);
export const pilaAgreementsSuccessAction = createAction(
  '[PILA PAYMENT / API] Pila Agreements Available Success',
  (agreementsAvailable: IPilaAgreement[]) => ({ agreementsAvailable })
);
export const pilaAgreementsFailAction = createAction(
  '[PILA PAYMENT / API] Pila Agreements Available Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const pilaAgreementsResetAction = createAction(
  '[PILA PAYMENT] Pila Agreements Available Reset'
);
