import { combineReducers } from '@ngrx/store';

import { featureOperators as operators } from '@modules/recharges/new-recharge/store/reducers/operators.reducer';
import { featureRecharge as recharge } from '@modules/recharges/new-recharge/store/reducers/recharges.reducer';

export const rechargesRootReducer = combineReducers({
  operators,
  recharge
});
