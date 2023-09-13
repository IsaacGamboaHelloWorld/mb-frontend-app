import { Action, createReducer, on } from '@ngrx/store';

import { IExperienceState } from '@modules/experience/store/experience.state';
import * as actions from '@modules/experience/store/experience.actions';
import { IEnrollmentState } from '@modules/auth/store/auth.state';
import { StepExperienceType } from '@modules/experience/constants/steps';

export const initialExperienceState: IExperienceState = {
  content: {
    processId: null,
    step: StepExperienceType.INIT_PIN_OTP_FLOW,
    success: false
  },
  information: null,
  loading: false,
  error: false,
  completed: false,
  message: ''
};

export const featureExperience = createReducer(
  initialExperienceState,
  on(
    actions.experienceLoadAction,
    (state: IExperienceState, { experienceData }) => {
      const { id, idType, remember } = experienceData.content;
      return {
        ...state,
        information:
          !!id && !!idType
            ? { idType, id, remember }
            : { ...state.information },
        loading: true,
        error: false,
        completed: false
      };
    }
  ),
  on(
    actions.experienceStepSuccessAction,
    (state: IExperienceState, { content }) => ({
      ...state,
      loading: false,
      completed: true,
      error: false,
      content
    })
  ),
  on(actions.experienceStepErrorAction, (state: IExperienceState) => ({
    ...state,
    loading: false,
    completed: false,
    error: true
  })),
  on(actions.experienceResetAction, () => initialExperienceState)
);

export const experienceReducer = (
  state: IEnrollmentState,
  action: Action
): IEnrollmentState => {
  return featureExperience(state, action);
};
