import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/tuplus/store/actions/generation-otp-tuplus.action';
import { IGenerateOtpState } from '@modules/tuplus/store/states/generate-otp-tuplus.state';

export const initGenerateOtpState: IGenerateOtpState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const generateOtpRedeem = createReducer(
  initGenerateOtpState,
  on(actions.generateOtpLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.generateOtpSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.generateOtpFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.generateOtpResetAction, (state) => initGenerateOtpState)
);
