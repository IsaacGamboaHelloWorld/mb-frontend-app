import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/recharges/new-recharge/store/actions/operators.action';
import { IOperatorsState } from '@modules/recharges/new-recharge/store/recharges.state';

export const initOperators: IOperatorsState = {
  names: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureOperators = createReducer(
  initOperators,
  on(actions.operatorsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.operatorsSuccessAction, (state, { operators }) => ({
    ...state,
    completed: true,
    loading: false,
    names: operators
  })),
  on(actions.operatorsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.operatorsResetAction, (state) => initOperators)
);
