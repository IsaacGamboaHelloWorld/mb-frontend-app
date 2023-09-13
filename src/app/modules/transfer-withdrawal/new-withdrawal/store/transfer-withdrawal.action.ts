import { createAction } from '@ngrx/store';

import {
  IOtpWithdrawal,
  IOtpWithdrawalResponse
} from '@modules/transfer-withdrawal/new-withdrawal/entities/otp-transfer-withdrawal.entities';

export const transferWithdrawalLoadAction = createAction(
  '[TRANSFER WITHDRAWAL / API] Transfer Withdrawal Load',
  (form: IOtpWithdrawal) => ({ form })
);
export const transferWithdrawalSuccessAction = createAction(
  '[TRANSFER WITHDRAWAL / API] Transfer Withdrawal Success',
  (response: IOtpWithdrawalResponse) => ({ response })
);
export const transferWithdrawalFailAction = createAction(
  '[TRANSFER WITHDRAWAL / API] Transfer Withdrawal Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const transferWithdrawalResetAction = createAction(
  '[TRANSFER WITHDRAWAL / API] Transfer Withdrawal Reset'
);
