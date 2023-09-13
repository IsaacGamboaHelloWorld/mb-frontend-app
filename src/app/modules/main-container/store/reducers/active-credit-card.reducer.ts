import { createReducer, on } from '@ngrx/store';

import {
  resetActiveCreditCard,
  setActiveCreditCard
} from '@modules/main-container/store/actions/data-user';

export const activeCreditCardReducer = createReducer(
  null,
  on(setActiveCreditCard, (state, { product }) => product),
  on(resetActiveCreditCard, (state) => null)
);
