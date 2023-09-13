import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IPocketsState,
  pocketsFeatureName
} from '@modules/pockets/store/pockets.state';

const PocketsState = createFeatureSelector<IPocketsState>(pocketsFeatureName);

export const createPocketSelector = createSelector(
  PocketsState,
  (state) => state.createPocket
);

export const editPocketSelector = createSelector(
  PocketsState,
  (state) => state.editPocket
);

export const movePocketSelector = createSelector(
  PocketsState,
  (state) => state.movePocket
);

export const deletePocketSelector = createSelector(
  PocketsState,
  (state) => state.deletePocket
);

export const categoriesSelector = createSelector(
  PocketsState,
  (state) => state.pocketsCategories
);
