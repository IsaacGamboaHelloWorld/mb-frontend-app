import { createAction } from '@ngrx/store';

import {
  IAgreement,
  IAgreementsBody,
  IAgreementsService
} from '@modules/payments/entities/billers.entities';

export const searchBillerLoadAction = createAction(
  '[PAYMENT PUBLIC / API] Search Biller Load',
  (body: IAgreementsBody) => ({ body })
);
export const searchBillerSuccessAction = createAction(
  '[PAYMENT PUBLIC / API] Search Biller Success',
  (information: IAgreement[]) => ({ information })
);
export const searchBillerFailAction = createAction(
  '[PAYMENT PUBLIC / API] Search Biller Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const searchBillerResetAction = createAction(
  '[PAYMENT PUBLIC] Search Biller Reset'
);
