import { createAction } from '@ngrx/store';

import { IRegisteredAccount } from '@modules/transfer/entities/registered-account.entities';

export const registeredAccountLoadAction = createAction(
  '[RECHARGE / API] Registered Account Load',
  (accountId: string, accountType: string) => ({ accountId, accountType })
);
export const registeredAccountSuccessAction = createAction(
  '[New TRANSFER / API] Registered Account Success',
  (products: IRegisteredAccount[]) => ({ products })
);
export const registeredAccountFailAction = createAction(
  '[New TRANSFER / API] Registered Account Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const registeredAccountResetAction = createAction(
  '[New TRANSFER] Registered Account Reset'
);
