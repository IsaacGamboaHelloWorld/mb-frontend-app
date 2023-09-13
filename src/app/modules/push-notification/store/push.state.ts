export const pushNotificationFeatureName = 'pushNotificationModuleState';

export interface IRegisterPush {
  enable: boolean;
  errorMessage: string;
  loading: boolean;
  completed: boolean;
  error: boolean;
}

export interface IPushNotificationState {
  register: IRegisterPush;
}
