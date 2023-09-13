import { createReducer, on } from '@ngrx/store';

import { hiddenNavBarAction } from '@modules/main-container/store/actions/auth-validation-session.action';

export const featureNavBar = createReducer(
  false,
  on(hiddenNavBarAction, (state, { hidden }) => hidden)
);
