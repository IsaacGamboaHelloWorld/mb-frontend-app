import { createAction } from '@ngrx/store';

export const certificateLoadAction = createAction(
  '[CERTIFICATE / API] Certificate Load',
  (
    accountId: string,
    accountType: string,
    includeBalance: boolean,
    recipient: string
  ) => ({
    accountId,
    accountType,
    includeBalance,
    recipient
  })
);
export const certificateResetAction = createAction(
  '[CERTIFICATE] Certificate Reset'
);
export const certificateSuccessAction = createAction(
  '[CERTIFICATE / API] Certificate Success'
);
export const certificateFailAction = createAction(
  '[CERTIFICATE / API] Certificate Fail',
  (errorMessage: string) => ({ errorMessage })
);
