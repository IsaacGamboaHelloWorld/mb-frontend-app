import { createAction } from '@ngrx/store';

export const pocketsCategoriesLoadAction = createAction(
  '[POCKETS / API] Pockets Categories Load'
);
export const pocketsCategoriesSuccessAction = createAction(
  '[POCKETS / API] Pockets Categories Success',
  (information: string[]) => ({ information })
);
export const pocketsCategoriesFailAction = createAction(
  '[POCKETS / API] Pockets Categories Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const pocketsCategoriesResetAction = createAction(
  '[POCKETS] Pockets Categories Reset'
);
