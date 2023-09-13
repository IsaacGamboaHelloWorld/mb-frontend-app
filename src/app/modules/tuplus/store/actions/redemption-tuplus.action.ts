import { createAction } from '@ngrx/store';
import {
  IRedeem,
  IRedeemBody
} from '@modules/tuplus/entities/redeem-tuplus.entities';

export const redeemLoadAction = createAction(
  '[REDEEM/ API] Redeem Load',
  (form: IRedeemBody) => ({
    form
  })
);
export const redeemResetAction = createAction('[REDEEM / API] Redeem Reset');
export const redeemSuccessAction = createAction(
  '[REDEEM / API] Redeem Success ',
  (information: IRedeem) => ({ information })
);
export const redeemFailAction = createAction(
  '[REDEEM / API] Redeem Fail ',
  (errorMessage: string) => ({ errorMessage })
);
export const retryAction = createAction(
  '[REDEEM / API] Redeem Retry ',
  (errorCode: number) => ({ errorCode })
);
