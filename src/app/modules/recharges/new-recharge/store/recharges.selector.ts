import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IRechargesState,
  rechargeFeatureName
} from '@modules/recharges/new-recharge/store/recharges.state';

const RechargeState = createFeatureSelector<IRechargesState>(
  rechargeFeatureName
);

export const operators = createSelector(
  RechargeState,
  (state: IRechargesState) => state?.operators
);

export const recharge = createSelector(
  RechargeState,
  (state: IRechargesState) => state?.recharge
);
