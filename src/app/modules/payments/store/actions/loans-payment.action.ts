import { createAction } from '@ngrx/store';

import {
  IBodyLoanPayment,
  ILoanPayment
} from '@modules/payments/entities/loans.entities';

export const paymentLoanLoadAction = createAction(
  '[PAYMENT PUBLIC / API] Payment Loan Load',
  (body: IBodyLoanPayment) => ({ body })
);
export const paymentLoanSuccessAction = createAction(
  '[PAYMENT PUBLIC / API] Payment Loan Success',
  (information: ILoanPayment) => ({ information })
);
export const paymentLoanFailAction = createAction(
  '[PAYMENT PUBLIC / API] Payment Loan Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const paymentLoanFailActionWithoutToast = createAction(
  '[PAYMENT PUBLIC / API] Payment Loan Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const paymentLoanResetAction = createAction(
  '[PAYMENT PUBLIC] Payment Loan Reset'
);
