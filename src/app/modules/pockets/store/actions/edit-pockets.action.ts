import { createAction } from '@ngrx/store';

import {
  IEditPocketRequest,
  IEditPocketResponse
} from '@modules/pockets/entities/pockets.entities';

export const editPocketLoadAction = createAction(
  '[POCKETS / API] Edit Pocket Load',
  (request: IEditPocketRequest) => ({ request })
);
export const editPocketSuccessAction = createAction(
  '[POCKETS / API] Edit Pocket Success',
  (response: IEditPocketResponse, successMessage: string) => ({
    response,
    successMessage
  })
);
export const editPocketFailAction = createAction(
  '[POCKETS / API] Edit Pocket Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const editPocketResetAction = createAction(
  '[POCKETS] Edit Pocket Reset'
);
