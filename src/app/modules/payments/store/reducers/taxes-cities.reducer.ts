import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/payments/store/actions/taxes-cities.action';
import { ITaxesCitiesState } from '@modules/payments/store/payments.state';

export const initTaxesCities: ITaxesCitiesState = {
  listCities: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureTaxesCities = createReducer(
  initTaxesCities,
  on(actions.taxesCitiesLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.taxesCitiesSuccessAction, (state, { listCities }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    listCities
  })),
  on(actions.taxesCitiesFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.taxesCitiesResetAction, () => initTaxesCities)
);
