import { createAction } from '@ngrx/store';

export const ValidatePing = createAction('[MAIN CONTAINER/API] Validate Ping');
export const PingSuccess = createAction('[MAIN CONTAINER/API] Success Ping');
export const PingFail = createAction('[MAIN CONTAINER/API] Fail Ping');
export const hiddenNavBarAction = createAction(
  '[MAIN CONTAINER] Hidden Nav Bar',
  (hidden: boolean) => ({ hidden })
);
