import { combineReducers } from '@ngrx/store';

import { featureMovements as movements } from '@modules/detail/product-detail/store/reducers/movements.reducer';

export const detailProductRootReducer = combineReducers({
  movements
});
