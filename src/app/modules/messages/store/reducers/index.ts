import { combineReducers } from '@ngrx/store';

import { featureMessages as allMessages } from '@modules/messages/store/reducers/messages.reducer';

export const messagesRootReducer = combineReducers({
  allMessages
});
