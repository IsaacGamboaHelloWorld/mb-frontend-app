import { createFeatureSelector, createSelector } from '@ngrx/store';

import { homeFeatureName, IHomeState } from '@modules/home/store/home.state';

const HomeState = createFeatureSelector<IHomeState>(homeFeatureName);

export const avalProducts = createSelector(
  HomeState,
  (state) => state?.otherProducts?.products
);

export const toggleAval = createSelector(
  HomeState,
  (state) => state?.otherProducts?.toggle
);

export const toggleOtherCredits = createSelector(
  HomeState,
  (state) => state?.otherCredits?.toggleCredits
);
