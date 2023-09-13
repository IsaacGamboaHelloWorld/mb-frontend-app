import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  authFeatureName,
  IEnrollmentState
} from '@modules/auth/store/auth.state';

const AuthState = createFeatureSelector<IEnrollmentState>(authFeatureName);

export const contentEnrollmentSelector = createSelector(
  AuthState,
  (state: IEnrollmentState) => state
);
