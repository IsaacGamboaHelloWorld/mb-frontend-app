import { createReducer, on } from '@ngrx/store';

import { IMovementsTuplusState } from '@modules/tuplus/store/states/movements-tuplus.state';
import * as actions from '@modules/tuplus/store/actions/movement-tuplus.action';

export const initMovements: IMovementsTuplusState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureMovements = createReducer(
  initMovements,
  on(actions.movementsTuplusLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.movementsTuplusSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.movementsTuplusFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.movementsTuplusResetAction, (state) => initMovements)
);
