import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/documents/statements/store/actions/statements.action';
import { IStatementFile } from '@modules/documents/statements/store/statements.state';

export const initStatements: IStatementFile = {
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureStatements = createReducer(
  initStatements,
  on(actions.statementsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.statementsSuccessAction, (state) => ({
    ...state,
    error: false,
    completed: true,
    loading: false
  })),
  on(actions.statementsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.statementsResetAction, (state) => initStatements)
);
