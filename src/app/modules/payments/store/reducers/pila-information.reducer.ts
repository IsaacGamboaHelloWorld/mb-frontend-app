import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/pila-information.action';
import { IPilaInformationState } from '@modules/payments/store/payments.state';

export const initPilaInformation: IPilaInformationState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePilaInformation = createReducer(
  initPilaInformation,
  on(actions.pilaInformationLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.pilaInformationSuccessAction, (state, { information }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    information
  })),
  on(actions.pilaInformationFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.pilaInformationResetAction, () => initPilaInformation)
);
