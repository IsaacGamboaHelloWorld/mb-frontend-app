import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/activate-credit-card/store/actions/active-credit-card.action';
import { IActiveCreditCardState } from '@modules/activate-credit-card/store/active-credit-card.state';

export const initActiveCreditCard: IActiveCreditCardState = {
  information: null,
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};

export const featureActiveCreditCard = createReducer(
  initActiveCreditCard,
  on(actions.activeCreditCardLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.activeCreditCardSuccessAction, (state, { information }) => ({
    ...state,
    completed: true,
    loading: false,
    error: false,
    information
  })),
  on(actions.activeCreditCardFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.activeCreditCardResetAction, (state) => initActiveCreditCard)
);
