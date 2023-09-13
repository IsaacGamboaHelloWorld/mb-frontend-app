import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/recharges/new-recharge/store/actions/recharge.action';
import { rechargeFailActionWithoutToast } from '@modules/recharges/new-recharge/store/actions/recharge.action';
import { IRechargeState } from '@modules/recharges/new-recharge/store/recharges.state';

export const initRecharge: IRechargeState = {
  form: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureRecharge = createReducer(
  initRecharge,
  on(actions.rechargeLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.rechargeSuccessAction, (state, { form }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    form
  })),
  on(
    actions.rechargeFailAction,
    rechargeFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(actions.rechargeResetAction, (state) => initRecharge)
);
