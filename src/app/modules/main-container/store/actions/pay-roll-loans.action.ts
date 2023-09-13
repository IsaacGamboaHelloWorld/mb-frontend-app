import { createAction } from '@ngrx/store';

import { IPayrollLoans } from '@app/commons/entities/pay-rolls-loans.entities';

export const rollLoansLoadAction = createAction(
  '[MAIN CONTAINER / API] Pay roll loans Load'
);
export const rollLoansSuccessAction = createAction(
  '[MAIN CONTAINER / API] Pay roll loans Success',
  (rollLoans: IPayrollLoans[]) => ({ rollLoans })
);
export const rollLoansFailAction = createAction(
  '[MAIN CONTAINER / API] Pay roll loans Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const rollLoansResetAction = createAction(
  '[MAIN CONTAINER / API] Pay roll loans Reset'
);
