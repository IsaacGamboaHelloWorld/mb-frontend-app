import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  detailTuplusFeatureName,
  IDetailTuplusState
} from '@modules/tuplus/store/states/index-tuplus.state';

const TuplusState = createFeatureSelector<IDetailTuplusState>(
  detailTuplusFeatureName
);

export const movements = createSelector(
  TuplusState,
  (state: IDetailTuplusState) => state?.movements
);

export const configurationFactor = createSelector(
  TuplusState,
  (state: IDetailTuplusState) => state?.configurationFactor
);

export const redeem = createSelector(
  TuplusState,
  (state: IDetailTuplusState) => state?.redemptionPoints
);
export const generateOtp = createSelector(
  TuplusState,
  (state: IDetailTuplusState) => state?.generateOtpRedeem
);

export const logoutTuplus = createSelector(
  TuplusState,
  (state: IDetailTuplusState) => state?.logoutTuplusState
);
export const sourcePath = createSelector(
  TuplusState,
  (state: IDetailTuplusState) => state?.sourcePathReducer
);
