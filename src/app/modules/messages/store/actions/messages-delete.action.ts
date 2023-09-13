import { createAction } from '@ngrx/store';

import {
  IBodyDeleteMessage,
  IGeneralMessageService
} from '@modules/messages/entities/messages.entities';

export const messagesDeleteLoadAction = createAction(
  '[MESSAGES / API] Messages Delete Load',
  (body: IBodyDeleteMessage) => ({ body })
);
export const messagesDeleteSuccessAction = createAction(
  '[MESSAGES / API] Messages Delete Success',
  (body: IGeneralMessageService, successMessage: string) => ({
    body,
    successMessage
  })
);
export const messagesDeleteFailAction = createAction(
  '[MESSAGES / API] Messages Delete Fail',
  (errorMessage: string) => ({ errorMessage })
);
