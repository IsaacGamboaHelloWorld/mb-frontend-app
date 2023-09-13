import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/push-notification/store/push.action';
import { IRegisterPush } from '@modules/push-notification/store/push.state';

export const initPushNotification: IRegisterPush = {
  enable: false,
  errorMessage: '',
  loading: false,
  completed: false,
  error: false
};

export const featureTogglePushNotification = createReducer(
  initPushNotification,
  on(
    actions.registerPushNotificationLoadAction,
    actions.deletePushNotificationLoadAction,
    (state) => ({
      ...state,
      loading: true,
      error: false,
      completed: false
    })
  ),
  on(
    actions.deletePushNotificationSuccessAction,
    actions.registerPushNotificationSuccessAction,
    (state) => ({
      ...state,
      loading: false,
      error: false,
      completed: true
    })
  ),
  on(actions.togglePushNotificationAction, (state, { enable }) => ({
    ...state,
    enable
  })),
  on(
    actions.deletePushNotificationErrorAction,
    actions.registerPushNotificationErrorAction,
    (state, { errorMessage }) => ({
      ...state,
      errorMessage,
      loading: false,
      error: true,
      completed: false
    })
  )
);
