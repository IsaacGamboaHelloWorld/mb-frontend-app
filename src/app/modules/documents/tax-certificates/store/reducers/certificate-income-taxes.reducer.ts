import { createReducer, on } from '@ngrx/store';

import { ICertificateIncomeTaxesState } from '@modules/documents/tax-certificates/store/tax-certificates.state';
import * as actions from '@modules/documents/tax-certificates/store/actions/certificate-income-taxes.action';

export const initCertificateIncomeTaxes: ICertificateIncomeTaxesState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureCertificateIncomeTaxes = createReducer(
  initCertificateIncomeTaxes,
  on(actions.certificateIncomeTaxesLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.certificateIncomeTaxesSuccessAction, (state) => ({
    ...state,
    completed: true,
    loading: false,
    error: false
  })),
  on(actions.certificateIncomeTaxesFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(
    actions.certificateIncomeTaxesResetAction,
    (state) => initCertificateIncomeTaxes
  )
);
