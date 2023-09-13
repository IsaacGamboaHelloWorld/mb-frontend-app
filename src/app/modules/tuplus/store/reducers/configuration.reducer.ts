import { createReducer, on } from '@ngrx/store';

import { IConfigurationFactorState } from '@modules/tuplus/store/states/configuration-factor.state';
import * as actions from '@modules/tuplus/store/actions/conversion-factor.action';

export const initconfiguration: IConfigurationFactorState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const configurationFactor = createReducer(
  initconfiguration,
  on(actions.conversionLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.conversionSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.conversionFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.conversionResetAction, (state) => initconfiguration)
);
