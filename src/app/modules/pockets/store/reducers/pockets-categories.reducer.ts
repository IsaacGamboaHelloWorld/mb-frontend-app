import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/pockets/store/actions/categories-pockets.action';
import { IPocketsCategoriesState } from '@modules/pockets/store/pockets.state';

export const initPocketsCategories: IPocketsCategoriesState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featurePocketsCategories = createReducer(
  initPocketsCategories,
  on(actions.pocketsCategoriesLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.pocketsCategoriesSuccessAction, (state, { information }) => ({
    ...state,
    loading: false,
    completed: true,
    error: false,
    errorMessage: '',
    information
  })),
  on(actions.pocketsCategoriesFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.pocketsCategoriesResetAction, () => initPocketsCategories)
);
