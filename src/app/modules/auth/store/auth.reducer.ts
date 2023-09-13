import { Action, createReducer, on } from '@ngrx/store';

import {
  IEnrollmentState,
  initialEnrollmentState
} from '@modules/auth/store/auth.state';
import * as actions from '@modules/auth/store/auth.actions';

const featureReducer = createReducer(
  initialEnrollmentState,
  on(actions.setLoadingAuthAction, (state) => ({
    ...state,
    loading: true,
    error: false,
    completed: false
  })),
  on(actions.startAuthAction, (state: IEnrollmentState, { authData }) => {
    const { id, idType, remember } = authData.content;

    return {
      ...state,
      information:
        !!id && !!idType ? { idType, id, remember } : { ...state.information },
      loading: true,
      error: false,
      completed: false
    };
  }),
  on(
    actions.enrollmentStepSuccessAction,
    (state: IEnrollmentState, { content }) => ({
      ...state,
      content,
      loading: false,
      completed: true,
      error: false
    })
  ),
  on(actions.enrollmentStepErrorAction, (state: IEnrollmentState) => ({
    ...state,
    loading: false,
    completed: false,
    error: true
  })),
  on(actions.enrollmentResetAction, () => initialEnrollmentState)
);

export const authReducer = (
  state: IEnrollmentState,
  action: Action
): IEnrollmentState => {
  return featureReducer(state, action);
};
