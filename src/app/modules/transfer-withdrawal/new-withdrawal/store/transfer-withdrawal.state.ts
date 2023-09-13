import { IOtpWithdrawalResponse } from '@modules/transfer-withdrawal/new-withdrawal/entities/otp-transfer-withdrawal.entities';

export const transferWithdrawalFeatureName = 'transferWithdrawalModuleState';

export interface ITransferWithdrawalState {
  response: IOtpWithdrawalResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
