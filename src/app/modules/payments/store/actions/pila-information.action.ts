import { createAction } from '@ngrx/store';

import {
  IPilaInformationRequest,
  IPilaInformationResponse
} from '@modules/payments/entities/pila-payment.entities';

export const pilaInformationLoadAction = createAction(
  '[PILA PAYMENT / API] Pila Information Load',
  (request: IPilaInformationRequest) => ({ request })
);
export const pilaInformationSuccessAction = createAction(
  '[PILA PAYMENT / API] Pila Information Success',
  (information: IPilaInformationResponse) => ({ information })
);
export const pilaInformationFailAction = createAction(
  '[PILA PAYMENT / API] Pila Information Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const pilaInformationResetAction = createAction(
  '[PILA PAYMENT] Pila Information Reset'
);
