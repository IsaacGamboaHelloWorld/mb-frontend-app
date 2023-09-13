import { createAction } from '@ngrx/store';

import {
  IPeriodItem,
  IServicePeriod
} from '@modules/documents/statements/entities/statements.entities';

export const periodLoadAction = createAction(
  '[STATEMENT / API] Period Load',
  (body: IServicePeriod) => ({ body })
);
export const periodResetAction = createAction('[STATEMENT] Period Reset');
export const periodSuccessAction = createAction(
  '[STATEMENT / API] Period Success',
  (periods: IPeriodItem[]) => ({ periods })
);
export const periodFailAction = createAction(
  '[STATEMENT / API] Period Fail',
  (errorMessage: string) => ({ errorMessage })
);
