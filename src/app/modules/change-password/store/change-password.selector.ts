import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  changePasswordFeatureName,
  IChangePasswordState
} from '@modules/change-password/store/change-password.state';

const ChangePasswordState = createFeatureSelector<IChangePasswordState>(
  changePasswordFeatureName
);

export const changePassword = createSelector(
  ChangePasswordState,
  (state: IChangePasswordState) => state
);
