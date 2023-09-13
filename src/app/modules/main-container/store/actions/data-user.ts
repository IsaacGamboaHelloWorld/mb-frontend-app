import { createAction } from '@ngrx/store';

import { IDataUser } from '@modules/main-container/entities/user.entities';
import { IStorageItem } from '@commons/entities/global.entities';

export const dataUserLoad = createAction('[HOME / API] Data User Load');
export const dataUserSuccess = createAction(
  '[HOME / API] Data User Success',
  (information: IDataUser) => ({ information })
);
export const dataUserFail = createAction('[HOME / API] Data User Fail');

export const setActiveCreditCard = createAction(
  '[HOME / UI] Set Active Credit Card',
  (product: IStorageItem) => ({ product })
);

export const resetActiveCreditCard = createAction(
  '[HOME / UI] Reset Active Credit Card'
);
