import { combineReducers } from '@ngrx/store';

import { featureBlockProduct as blockProduct } from './block-product.reducer';
import { debitCardListReducer as debitCard } from './debit-card-list.reducer';

export const blockProductsRootReducer = combineReducers({
  blockProduct,
  debitCard
});
