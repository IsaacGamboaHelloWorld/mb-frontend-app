import { combineReducers } from '@ngrx/store';

import { featureActiveCreditCard as active } from '@modules/activate-credit-card/store/reducers/active-credit-card.reducer';

export const activeBlockCreditCardRootReducer = combineReducers({
  active
});
