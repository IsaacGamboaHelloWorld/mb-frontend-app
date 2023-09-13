import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IPushNotificationState,
  pushNotificationFeatureName
} from '@modules/push-notification/store/push.state';

const PushNotificationState = createFeatureSelector<IPushNotificationState>(
  pushNotificationFeatureName
);

export const registerPushSelector = createSelector(
  PushNotificationState,
  (state) => state.register
);
