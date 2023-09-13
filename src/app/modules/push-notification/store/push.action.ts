import { createAction } from '@ngrx/store';

import { IRegisterPushBody } from '@modules/push-notification/entities/push-notification.entities';

export const registerPushNotificationLoadAction = createAction(
  '[PUSH NOTIFICATION / API] Load register push notification',
  (body: IRegisterPushBody) => ({ body })
);

export const registerPushNotificationErrorAction = createAction(
  '[PUSH NOTIFICATION / API] Error register push notification',
  (errorMessage: string, enable: boolean) => ({ errorMessage, enable })
);

export const registerPushNotificationSuccessAction = createAction(
  '[PUSH NOTIFICATION / API] Success push notification'
);

export const deletePushNotificationLoadAction = createAction(
  '[PUSH NOTIFICATION / API] Load delete push notification'
);

export const deletePushNotificationErrorAction = createAction(
  '[PUSH NOTIFICATION / API] Error delete push notification',
  (errorMessage: string) => ({ errorMessage })
);

export const deletePushNotificationSuccessAction = createAction(
  '[PUSH NOTIFICATION / API] Success delete push notification'
);

export const togglePushNotificationAction = createAction(
  '[PUSH NOTIFICATION / UI] Delete push notification',
  (enable: boolean) => ({ enable })
);
