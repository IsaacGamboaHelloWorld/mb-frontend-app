import { createReducer, on } from '@ngrx/store';

import { IRegisteredAccountState } from '@modules/transfer/store/transfer.state';
import * as actions from '@modules/transfer/store/actions/registered-accounts.action';

export const initRegisteredAccount: IRegisteredAccountState = {
  products: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureRegisteredAccount = createReducer(
  initRegisteredAccount,
  on(actions.registeredAccountLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.registeredAccountSuccessAction, (state, { products }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    products
  })),
  on(actions.registeredAccountFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.registeredAccountResetAction, (state) => initRegisteredAccount)
);
