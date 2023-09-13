import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  advancesFeatureName,
  IAdvanceState
} from '@modules/detail/advances/new-advance/store/advances.state';

const advanceState = createFeatureSelector<IAdvanceState>(advancesFeatureName);

export const advanceTransfer = createSelector(
  advanceState,
  (state: IAdvanceState) => state
);
