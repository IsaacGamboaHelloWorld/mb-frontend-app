import { createAction } from '@ngrx/store';

import {
  IMessagesResponse,
  IMessagesService
} from '@modules/messages/entities/messages.entities';

export const messagesLoadAction = createAction(
  '[MESSAGES / API] Messages Load',
  (body: IMessagesService, showToast: boolean) => ({ body, showToast })
);
export const messagesSuccessAction = createAction(
  '[MESSAGES / API] Messages Success',
  (messages: IMessagesResponse) => ({ messages })
);
export const messagesFailAction = createAction(
  '[MESSAGES / API] Messages Fail',
  (errorMessage: string) => ({ errorMessage })
);

export const messagesFailToastAction = createAction(
  '[MESSAGES / API] Messages Fail with Toast',
  (errorMessage: string) => ({ errorMessage })
);
