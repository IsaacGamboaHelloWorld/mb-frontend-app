import { createAction } from '@ngrx/store';

import {
  IRechargeService,
  IRespondRecharge
} from '@modules/recharges/new-recharge/entities/recharge.entities';

export const rechargeLoadAction = createAction(
  '[RECHARGE / API] Recharge Load',
  (form: IRechargeService) => ({ form })
);
export const rechargeResetAction = createAction('[RECHARGE] Recharge Reset');

export const rechargeSuccessAction = createAction(
  '[RECHARGE / API] Recharge Success',
  (form: IRespondRecharge) => ({ form })
);
export const rechargeFailAction = createAction(
  '[RECHARGE / API] Recharge Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const rechargeFailActionWithoutToast = createAction(
  '[RECHARGE / API] Recharge Fail',
  (errorMessage: string) => ({ errorMessage })
);
