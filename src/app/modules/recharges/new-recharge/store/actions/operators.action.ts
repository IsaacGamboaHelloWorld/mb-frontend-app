import { createAction } from '@ngrx/store';

import { IOperator } from '@modules/recharges/new-recharge/entities/operatators.entities';

export const operatorsLoadAction = createAction(
  '[RECHARGE / API] Operators Load'
);
export const operatorsResetAction = createAction('[RECHARGE] Operators Reset');
export const operatorsSuccessAction = createAction(
  '[RECHARGE / API] Operators Success',
  (operators: IOperator[]) => ({ operators })
);
export const operatorsFailAction = createAction(
  '[RECHARGE / API] Operators Fail',
  (errorMessage: string) => ({ errorMessage })
);
