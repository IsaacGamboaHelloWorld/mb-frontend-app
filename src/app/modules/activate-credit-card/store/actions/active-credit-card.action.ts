import { createAction } from '@ngrx/store';

import {
  IActiveCreditCardBody,
  IActiveCreditCardService
} from '@modules/activate-credit-card/entities/active-block-credit-card.entities';

export const activeCreditCardLoadAction = createAction(
  '[HOME ACTIVE BLOCK CREDIT CARD / API] Active credit card Load',
  (product: IActiveCreditCardBody) => ({ product })
);
export const activeCreditCardSuccessAction = createAction(
  '[HOME ACTIVE BLOCK CREDIT CARD / API] Active credit card Success',
  (information: IActiveCreditCardService) => ({ information })
);
export const activeCreditCardFailAction = createAction(
  '[HOME ACTIVE BLOCK CREDIT CARD / API] Active credit card Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const activeCreditCardResetAction = createAction(
  '[HOME ACTIVE BLOCK CREDIT CARD] Active credit card Reset'
);
