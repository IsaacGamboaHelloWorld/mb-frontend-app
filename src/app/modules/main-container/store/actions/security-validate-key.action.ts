import { createAction } from '@ngrx/store';

export const ValidateSession = createAction(
  '[MAIN CONTAINER/API] validate session'
);
export const SessionSuccess = createAction(
  '[MAIN CONTAINER/API] Success session'
);
export const SessionFail = createAction('[MAIN CONTAINER/API] Fail session');
