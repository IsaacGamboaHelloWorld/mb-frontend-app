import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/taxes-agreements.action';
import { ITaxesAgreementsState } from '@modules/payments/store/payments.state';

export const initTaxesAgreements: ITaxesAgreementsState = {
  taxesAgreements: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureTaxesAgreements = createReducer(
  initTaxesAgreements,
  on(actions.taxesAgreementsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.taxesAgreementsSuccessAction, (state, { taxesAgreements }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    taxesAgreements
  })),
  on(actions.taxesAgreementsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.taxesAgreementsResetAction, () => initTaxesAgreements)
);
