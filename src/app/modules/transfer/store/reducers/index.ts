import { combineReducers } from '@ngrx/store';

import { featureRegisteredAccount as registeredAccounts } from '@modules/transfer/store/reducers/registerred-account.reducer';
import { featureNewTransfer as newTransfer } from '@modules/transfer/store/reducers/transfer.reducer';
import { featureCostTransfer as costTransfer } from '@modules/transfer/store/reducers/cost-tansfer.reducer';

export const newTransfersRootReducer = combineReducers({
  registeredAccounts,
  newTransfer,
  costTransfer
});
