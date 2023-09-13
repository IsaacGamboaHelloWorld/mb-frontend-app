import { createAction } from '@ngrx/store';

import {
  ICreatePocketRequest,
  ICreatePocketResponse
} from '@modules/pockets/entities/pockets.entities';

export const createPocketLoadAction = createAction(
  '[POCKETS / API] Create Pocket Load',
  (request: ICreatePocketRequest) => ({ request })
);
export const createPocketSuccessAction = createAction(
  '[POCKETS / API] Create Pocket Success',
  (response: ICreatePocketResponse) => ({ response })
);
export const createPocketFailAction = createAction(
  '[POCKETS / API] Create Pocket Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const createPocketResetAction = createAction(
  '[POCKETS] Create Pocket Reset'
);
