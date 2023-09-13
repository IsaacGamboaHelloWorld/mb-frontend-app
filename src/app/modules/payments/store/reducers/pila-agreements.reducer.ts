import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/pila-agreements.action';
import { IPilaAgreementsState } from '@modules/payments/store/payments.state';

export const initPilaAgreements: IPilaAgreementsState = {
  agreementsAvailable: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePilaAgreements = createReducer(
  initPilaAgreements,
  on(actions.pilaAgreementsLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.pilaAgreementsSuccessAction, (state, { agreementsAvailable }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    agreementsAvailable
  })),
  on(actions.pilaAgreementsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.pilaAgreementsResetAction, () => initPilaAgreements)
);
