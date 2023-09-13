import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/taxes-amount-reference.action';
import { ITaxesAmountReferenceState } from '@modules/payments/store/payments.state';

export const initTaxesAmountReference: ITaxesAmountReferenceState = {
  amountReference: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureTaxesAmountReference = createReducer(
  initTaxesAmountReference,
  on(actions.taxesAmountReferenceLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(
    actions.taxesAmountReferenceSuccessAction,
    (state, { amountReference }) => ({
      ...state,
      loading: false,
      completed: true,
      error: false,
      errorMessage: '',
      amountReference
    })
  ),
  on(actions.taxesAmountReferenceFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.taxesAmountReferenceResetAction, () => initTaxesAmountReference)
);
