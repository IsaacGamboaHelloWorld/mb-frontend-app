import { createAction } from '@ngrx/store';

export const certificateTCLoadAction = createAction(
  '[CERTIFICATE TC / API] Certificate TC Load'
);
export const certificateTCResetAction = createAction(
  '[CERTIFICATE TC] Certificate TC Reset'
);
export const certificateTCSuccessAction = createAction(
  '[CERTIFICATE TC / API] Certificate TC Success',
  (successMessage: string) => ({
    successMessage
  })
);
export const certificateTCFailAction = createAction(
  '[CERTIFICATE TC / API] Certificate TC Fail',
  (errorMessage: string) => ({ errorMessage })
);
