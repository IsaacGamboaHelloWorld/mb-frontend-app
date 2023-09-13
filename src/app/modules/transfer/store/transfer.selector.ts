import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  INewTransfersState,
  newTransferFeatureName
} from '@modules/transfer/store/transfer.state';

const NewTransferState = createFeatureSelector<INewTransfersState>(
  newTransferFeatureName
);

export const newTransfer = createSelector(
  NewTransferState,
  (state: INewTransfersState) => state?.newTransfer
);

export const registeredAccount = createSelector(
  NewTransferState,
  (state: INewTransfersState) => state?.registeredAccounts
);

export const costTransfer = createSelector(
  NewTransferState,
  (state: INewTransfersState) => state?.costTransfer
);
