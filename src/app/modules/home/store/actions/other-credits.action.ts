import { createAction } from '@ngrx/store';

export const otherCreditsToggle = createAction(
  '[HOME] Other credits toggle',
  (show: boolean) => ({ show })
);
