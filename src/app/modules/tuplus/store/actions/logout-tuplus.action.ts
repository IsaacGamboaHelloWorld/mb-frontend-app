import { createAction } from '@ngrx/store';
import { ILogoutTuplus } from '@modules/tuplus/entities/logout-tuplus.entities';

export const logoutLoadAction = createAction('[LOGOUT / API] Logout Load');
export const logoutSuccessAction = createAction(
  '[ LOGOUT / API] Logout Success',
  (information: ILogoutTuplus) => ({ information })
);
export const logoutFailAction = createAction(
  '[LOGOUT / API] Logout Fail',
  (errorMessage: string) => ({ errorMessage })
);
