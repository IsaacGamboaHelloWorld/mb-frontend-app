import { createAction } from '@ngrx/store';

import {
  IPilaPaymentRequest,
  IPilaPaymentResponse
} from '@modules/payments/entities/pila-payment.entities';

export const pilaPaymentLoadAction = createAction(
  '[PILA PAYMENT / API] Pila Payment Load',
  (request: IPilaPaymentRequest) => ({ request })
);
export const pilaPaymentSuccessAction = createAction(
  '[PILA PAYMENT / API] Pila Payment Success',
  (response: IPilaPaymentResponse) => ({ response })
);
export const pilaPaymentFailAction = createAction(
  '[PILA PAYMENT / API] Pila Payment Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const pilaPaymentFailActionWithoutToast = createAction(
  '[PILA PAYMENT / API] Pila Payment Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const pilaPaymentResetAction = createAction(
  '[PILA PAYMENT] Pila Payment Reset'
);
