import { combineReducers } from '@ngrx/store';
import { featureTogglePushNotification as register } from '@modules/push-notification/store/reducers/push.reducer';

export const pushNotificationRootReducer = combineReducers({
  register
});
