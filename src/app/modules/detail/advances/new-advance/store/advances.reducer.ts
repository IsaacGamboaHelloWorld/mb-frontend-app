import { createReducer, on } from '@ngrx/store';

import { IAdvanceState } from '@modules/detail/advances/new-advance/store/advances.state';
import * as actions from '@modules/detail/advances/new-advance/store/advances.action';
import { advanceFailActionWithoutToast } from '@modules/detail/advances/new-advance/store/advances.action';

export const initAdvance: IAdvanceState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureAdvance = createReducer(
  initAdvance,
  on(actions.advanceLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.advanceSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(
    actions.advanceFailAction,
    advanceFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(actions.advanceResetAction, (state) => initAdvance)
);
