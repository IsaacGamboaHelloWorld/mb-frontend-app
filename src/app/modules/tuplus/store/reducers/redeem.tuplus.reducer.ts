import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/tuplus/store/actions/redemption-tuplus.action';
import { IRedeemPointsState } from '@modules/tuplus/store/states/redeem-tuplus.state';

export const initRedeemPoints: IRedeemPointsState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorRetry: false,
  errorMessage: '',
  errorCode: 0
};

export const redemptionPoints = createReducer(
  initRedeemPoints,
  on(actions.redeemLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.redeemSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.redeemFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.retryAction, (state, { errorCode }) => ({
    ...state,
    loading: false,
    completed: false,
    error: false,
    errorRetry: true,
    errorCode
  })),
  on(actions.redeemResetAction, (state) => initRedeemPoints)
);
