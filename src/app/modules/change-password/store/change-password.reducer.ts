import { createReducer, on } from '@ngrx/store';

import { IChangePasswordState } from '@modules/change-password/store/change-password.state';
import * as actions from '@modules/change-password/store/change-password.action';

export const initChangePassword: IChangePasswordState = {
  form: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureChangePassword = createReducer(
  initChangePassword,
  on(
    actions.changePasswordLoadAction,
    actions.setLoadingChangePasswordAction,
    (state) => ({
      ...state,
      loading: true,
      completed: false,
      error: false,
      errorMessage: ''
    })
  ),
  on(actions.changePasswordSuccessAction, (state, { form }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    form
  })),
  on(actions.changePasswordFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.changePasswordResetAction, (state) => initChangePassword)
);
