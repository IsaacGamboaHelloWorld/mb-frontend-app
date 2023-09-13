import { createAction } from '@ngrx/store';

import {
  IChangePasswordResponse,
  IChangePasswordService
} from '@modules/change-password/entities/change-password.entities';
import { type } from '@commons/utils/util';

export const setLoadingChangePasswordAction = createAction(
  type('[CHANGE PASSWORD] Set Loading Change Password')
);

export const changePasswordLoadAction = createAction(
  '[CHANGE PASSWORD / API] Change Password Load',
  (form: IChangePasswordService) => ({ form })
);

export const changePasswordSuccessAction = createAction(
  '[CHANGE PASSWORD / API] Change Password Success',
  (form: IChangePasswordResponse) => ({ form })
);
export const changePasswordFailAction = createAction(
  '[CHANGE PASSWORD / API] Change Password Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const changePasswordResetAction = createAction(
  '[CHANGE PASSWORD] Change Password Reset'
);

export const sendMessageRequest = createAction(
  '[MESSAGES / API] Request send Message'
);
export const sendMessageSuccess = createAction(
  '[MESSAGES / API] Success send Message'
);
export const sendMessageError = createAction(
  '[MESSAGES / API] Error send Message'
);
