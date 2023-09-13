import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ITransferWithdrawalState,
  transferWithdrawalFeatureName
} from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.state';

const transferWithdrawalState = createFeatureSelector<ITransferWithdrawalState>(
  transferWithdrawalFeatureName
);

export const transferWithdrawal = createSelector(
  transferWithdrawalState,
  (state: ITransferWithdrawalState) => state
);
