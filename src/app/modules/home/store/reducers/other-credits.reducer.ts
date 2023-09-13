import { createReducer, on } from '@ngrx/store';

import { otherCreditsToggle } from '@modules/home/store/actions/other-credits.action';

export const featureOtherCreditToggle = createReducer(
  false,
  on(otherCreditsToggle, (state, { show }) => show)
);
