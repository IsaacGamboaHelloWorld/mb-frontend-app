import { createAction } from '@ngrx/store';

import { IDebitCardListService } from '@modules/block-product/entities/block.entities';

export const debitCardListLoadAction = createAction(
  '[DEBIT CARD LIST / API] Debit Card List Load'
);

export const debitCardListSuccessAction = createAction(
  '[DEBIT CARD LIST / API] Debit Card List Success',
  (data: IDebitCardListService) => ({ data })
);

export const debitCardListFailAction = createAction(
  '[DEBIT CARD LIST / API] Debit Card List Fail',
  (error: string) => ({ error })
);
export const debitCardListResetAction = createAction(
  '[DEBIT CARD LIST / API] Debit Card List Reset'
);
