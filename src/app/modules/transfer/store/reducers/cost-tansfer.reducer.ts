import { createReducer, on } from '@ngrx/store';

import { ICostTransferState } from '@modules/transfer/store/transfer.state';
import * as actions from '@modules/transfer/store/actions/cost-transfer.action';

export const initCostTransfer: ICostTransferState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureCostTransfer = createReducer(
  initCostTransfer,
  on(actions.costTransferLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.costTransferSuccessAction, (state, { respond }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information: respond
  })),
  on(actions.costTransferFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.costTransferResetAction, (state) => initCostTransfer)
);
