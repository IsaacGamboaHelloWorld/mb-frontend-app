import { createAction } from '@ngrx/store';

import {
  IDeletePocketRequest,
  IDeletePocketResponse
} from '@modules/pockets/entities/pockets.entities';

export const deletePocketLoadAction = createAction(
  '[POCKETS / API] Delete Pocket Load',
  (request: IDeletePocketRequest) => ({ request })
);
export const deletePocketSuccessAction = createAction(
  '[POCKETS / API] Delete Pocket Success',
  (response: IDeletePocketResponse, successMessage: string) => ({
    response,
    successMessage
  })
);
export const deletePocketFailAction = createAction(
  '[POCKETS / API] Delete Pocket Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const deletePocketResetAction = createAction(
  '[POCKETS] Delete Pocket Reset'
);
