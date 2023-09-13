import { createAction } from '@ngrx/store';

import { ITuplus } from '@modules/main-container/entities/tuplus.entities';

export const tuplusLoad = createAction('[HOME / API] Tu Plus Load');
export const tuplusSuccess = createAction(
  '[HOME / API] Tu Plus Success',
  (information: ITuplus) => ({ information })
);
export const tuplusFail = createAction(
  '[HOME / API] Tu Plus Fail',
  (errorMessage: string) => ({
    errorMessage
  })
);
