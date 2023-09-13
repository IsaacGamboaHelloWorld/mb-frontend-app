import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  activeCreditCardFeatureName,
  IActiveBlockCreditCardState
} from '@modules/activate-credit-card/store/active-credit-card.state';

const ActiveCreditCard = createFeatureSelector<IActiveBlockCreditCardState>(
  activeCreditCardFeatureName
);

export const activeCreditCard = createSelector(
  ActiveCreditCard,
  (state) => state?.active
);
