import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IMessagesState,
  messagesFeatureName
} from '@modules/messages/store/messages.state';

const MessageState = createFeatureSelector<IMessagesState>(messagesFeatureName);

export const messagesSelector = createSelector(
  MessageState,
  (state) => state?.allMessages
);
