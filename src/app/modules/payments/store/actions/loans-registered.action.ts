import { createAction } from '@ngrx/store';

import { IRegisteredLoan } from '@modules/payments/entities/loans.entities';

export const registeredLoansLoadAction = createAction(
  '[PAYMENT PUBLIC / API] Registered Loans Load'
);
export const registeredLoansSuccessAction = createAction(
  '[PAYMENT PUBLIC / API] Registered Loans Success',
  (registeredLoans: IRegisteredLoan[]) => ({ registeredLoans })
);
export const registeredLoansFailAction = createAction(
  '[PAYMENT PUBLIC / API] Registered Loans Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const registeredLoansResetAction = createAction(
  '[PAYMENT PUBLIC] Registered Loans Reset'
);
