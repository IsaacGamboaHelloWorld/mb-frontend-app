import { createReducer, on } from '@ngrx/store';

import { INewTransferState } from '@modules/transfer/store/transfer.state';
import * as actions from '@modules/transfer/store/actions/transfer.action';

export const initNewTransfer: INewTransferState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureNewTransfer = createReducer(
  initNewTransfer,
  on(
    actions.newTransferLoadAction,
    actions.newTransferNotRegisteredLoadAction,
    (state) => ({
      ...state,
      loading: true,
      completed: false,
      error: false,
      errorMessage: ''
    })
  ),
  on(
    actions.newTransferSuccessAction,
    actions.newTransferNotRegisteredSuccessAction,
    (state, { respond }) => ({
      ...state,
      completed: true,
      loading: false,
      error: false,
      information: respond
    })
  ),
  on(
    actions.newTransferFailAction,
    actions.newTransferNotRegisteredFailAction,
    actions.newTransferFailActionWithoutToast,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(
    actions.newTransferResetAction,
    actions.newTransferNotRegisteredResetAction,
    (_) => initNewTransfer
  )
);
