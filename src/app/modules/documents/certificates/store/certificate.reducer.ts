import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/documents/certificates/store/certificate.action';
import { ICertificateState } from '@modules/documents/certificates/store/certificate.state';

export const initCertificate: ICertificateState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureCertificate = createReducer(
  initCertificate,
  on(actions.certificateLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.certificateSuccessAction, (state) => ({
    ...state,
    completed: true,
    loading: false,
    error: false
  })),
  on(actions.certificateFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.certificateResetAction, (state) => initCertificate)
);
