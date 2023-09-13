import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/main-container/store/actions/qr-info.action';
import { IQrInfoState } from '@modules/main-container/store/states/main-container.state';

export const initQrInfo: IQrInfoState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureQrInfo = createReducer(
  initQrInfo,
  on(actions.qrInfoLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.qrInfoSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.qrInfoFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.qrInfoResetAction, (state) => initQrInfo)
);
