import { createReducer, on } from '@ngrx/store';

import { ICertificateRACState } from '@modules/documents/tax-certificates/store/tax-certificates.state';
import * as actions from '@modules/documents/tax-certificates/store/actions/certificate-rac.action';

export const initCertificateRAC: ICertificateRACState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureCertificateRAC = createReducer(
  initCertificateRAC,
  on(actions.certificateRACLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.certificateRACSuccessAction, (state) => ({
    ...state,
    completed: true,
    loading: false,
    error: false
  })),
  on(actions.certificateRACFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.certificateRACResetAction, (state) => initCertificateRAC)
);
