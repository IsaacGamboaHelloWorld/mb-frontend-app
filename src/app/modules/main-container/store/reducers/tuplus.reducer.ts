import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/tuplus.action';
import { ITuplusState } from '@modules/main-container/store/states/main-container.state';

export const initTuplus: ITuplusState = {
  completed: false,
  information: null,
  errorMessage: '',
  error: false,
  loading: false
};

export const featureTuplus = createReducer(
  initTuplus,
  on(actions.tuplusLoad, (state) => ({
    completed: false,
    error: false,
    loading: true,
    ...state
  })),
  on(actions.tuplusSuccess, (state, { information }) => ({
    ...state,
    completed: true,
    error: false,
    loading: false,
    information
  })),
  on(actions.tuplusFail, (state, { errorMessage }) => ({
    completed: false,
    error: true,
    errorMessage,
    loading: false,
    ...state
  }))
);
