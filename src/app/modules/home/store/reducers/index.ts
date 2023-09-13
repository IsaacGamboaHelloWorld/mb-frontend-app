import { combineReducers } from '@ngrx/store';

import {
  featureOtherProduct as products,
  featureOtherProductToggle as toggle
} from '@modules/home/store/reducers/other-products.reducer';
import { featureOtherCreditToggle as toggleCredits } from '@modules/home/store/reducers/other-credits.reducer';

export const otherProducts = combineReducers({
  products,
  toggle
});

export const otherCredits = combineReducers({
  toggleCredits
});

export const homeRootReducer = combineReducers({
  otherProducts,
  otherCredits
});
