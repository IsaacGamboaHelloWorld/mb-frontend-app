import { createReducer, on } from '@ngrx/store';

import * as actions from '@modules/messages/store/actions/messages.action';
import { IAllMessageState } from '@modules/messages/store/messages.state';
import { messagesReadLoadAction } from '@modules/messages/store/actions/messages-read.action';
import {
  messagesDeleteFailAction,
  messagesDeleteSuccessAction
} from '@modules/messages/store/actions/messages-delete.action';

export const initMessages: IAllMessageState = {
  messages: [],
  loading: false,
  completed: false,
  error: false,
  retry: false,
  errorMessage: ''
};

export const featureMessages = createReducer(
  initMessages,
  on(actions.messagesLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.messagesSuccessAction, (state, { messages }) => ({
    ...state,
    ...messages,
    loading: false,
    completed: true,
    error: false
  })),
  on(messagesReadLoadAction, (state, { body }) => ({
    ...state,
    messages: state.messages.map((message) =>
      message.id === body.idNotification
        ? {
            ...message,
            read: true
          }
        : message
    )
  })),
  on(messagesDeleteSuccessAction, (state, { body }) => {
    const newMessages = state.messages.filter(
      (message) => !body?.request?.idNotification.includes(message?.id)
    );
    return {
      ...state,
      messages: newMessages,
      loading: false,
      completed: true,
      error: false,
      retry: false
    };
  }),
  on(
    actions.messagesFailAction,
    actions.messagesFailToastAction,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      completed: false,
      error: true,
      errorMessage
    })
  ),
  on(messagesDeleteFailAction, (state) => ({
    ...state,
    retry: true
  }))
);
