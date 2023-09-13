import { createAction } from '@ngrx/store';

import {
  IBillerDetail,
  IBillerDetailBody
} from '@modules/payments/entities/billers.entities';

export const detailBillerLoadAction = createAction(
  '[PAYMENT PUBLIC / API] Detail Billers Load',
  (body: IBillerDetailBody) => ({ body })
);
export const detailBillerSuccessAction = createAction(
  '[PAYMENT PUBLIC / API] Detail Billers Success',
  (information: IBillerDetail) => ({ information })
);
export const detailBillerFailAction = createAction(
  '[PAYMENT PUBLIC / API] Detail Billers Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const detailBillerResetAction = createAction(
  '[PAYMENT PUBLIC] Detail Billers Reset'
);
