import { createReducer, on } from '@ngrx/store';

import { ICertificateGMFState } from '@modules/documents/tax-certificates/store/tax-certificates.state';
import * as actions from '@modules/documents/tax-certificates/store/actions/certificate-gmf.action';

export const initCertificateGMF: ICertificateGMFState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureCertificateGMF = createReducer(
  initCertificateGMF,
  on(actions.certificateGMFLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.certificateGMFSuccessAction, (state) => ({
    ...state,
    completed: true,
    loading: false,
    error: false
  })),
  on(actions.certificateGMFFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.certificateGMFResetAction, (state) => initCertificateGMF)
);
