import { createAction } from '@ngrx/store';
import { IProductNickname } from '@modules/main-container/entities/main-products.entities';

export const nicknamesLoadAction = createAction(
  '[MAIN CONTAINER / API] Nicknames Load'
);
export const nicknamesSuccessAction = createAction(
  '[MAIN CONTAINER / API] Nicknames Success',
  (nicknames: IProductNickname[]) => ({ nicknames })
);
export const nicknamesFailAction = createAction(
  '[MAIN CONTAINER / API] Nicknames Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const nicknamesResetAction = createAction(
  '[MAIN CONTAINER / API] Nicknames Reset'
);
