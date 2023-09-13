import { ITransferWithdrawalState } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.state';
import { createReducer, on } from '@ngrx/store';
import * as actions from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.action';

export const initTransferWithdrawal: ITransferWithdrawalState = {
  response: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureTransferWithdrawalReducer = createReducer(
  initTransferWithdrawal,
  on(actions.transferWithdrawalLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.transferWithdrawalSuccessAction, (state, { response }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    response
  })),
  on(actions.transferWithdrawalFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.transferWithdrawalResetAction, (state) => initTransferWithdrawal)
);
