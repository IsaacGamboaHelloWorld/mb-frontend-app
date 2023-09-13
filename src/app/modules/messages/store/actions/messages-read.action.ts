import { createAction } from '@ngrx/store';

import { IBodyReadMessage } from '@modules/messages/entities/messages.entities';

export const messagesReadLoadAction = createAction(
  '[MESSAGES / API] Messages Read Load',
  (body: IBodyReadMessage) => ({ body })
);
export const messagesReadSuccessAction = createAction(
  '[MESSAGES / API] Messages Read Success'
);
export const messagesReadFailAction = createAction(
  '[MESSAGES / API] Messages Read Fail',
  (errorMessage: string) => ({ errorMessage })
);
