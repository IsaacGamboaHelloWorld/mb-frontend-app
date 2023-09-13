import { createReducer, on } from '@ngrx/store';

import { ICertificateTCState } from '@modules/documents/tax-certificates/store/tax-certificates.state';
import * as actions from '@modules/documents/tax-certificates/store/actions/certificate-tc.action';

export const initCertificateTc: ICertificateTCState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureCertificateTC = createReducer(
  initCertificateTc,
  on(actions.certificateTCLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.certificateTCSuccessAction, (state) => ({
    ...state,
    completed: true,
    loading: false,
    error: false
  })),
  on(actions.certificateTCFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.certificateTCResetAction, (state) => initCertificateTc)
);
