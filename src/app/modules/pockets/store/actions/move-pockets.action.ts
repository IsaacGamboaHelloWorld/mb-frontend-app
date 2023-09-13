import { createAction } from '@ngrx/store';

import {
  IMovePocketRequest,
  IMovePocketResponse
} from '@modules/pockets/entities/pockets.entities';

export const movePocketLoadAction = createAction(
  '[POCKETS / API] Move Pocket Load',
  (request: IMovePocketRequest) => ({ request })
);
export const movePocketSuccessAction = createAction(
  '[POCKETS / API] Move Pocket Success',
  (response: IMovePocketResponse) => ({ response })
);
export const movePocketFailAction = createAction(
  '[POCKETS / API] Move Pocket Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const movePocketResetAction = createAction(
  '[POCKETS] Move Pocket Reset'
);
