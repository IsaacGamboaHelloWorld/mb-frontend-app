import { combineReducers } from '@ngrx/store';

import { featureCreatePocket as createPocket } from '@modules/pockets/store/reducers/create-pockets.reducer';
import { featureEditPocket as editPocket } from '@modules/pockets/store/reducers/edit-pockets.reducer';
import { featureMovePocket as movePocket } from '@modules/pockets/store/reducers/move-pockets.reducer';
import { featureDeletePocket as deletePocket } from '@modules/pockets/store/reducers/delete-pockets.reducer';
import { featurePocketsCategories as categories } from '@modules/pockets/store/reducers/pockets-categories.reducer';

export const pocketsRootReducer = combineReducers({
  createPocket,
  editPocket,
  movePocket,
  deletePocket,
  categories
});
