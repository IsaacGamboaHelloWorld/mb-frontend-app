import { IMessage } from '@modules/messages/entities/messages.entities';

export const messagesFeatureName = 'messagesModuleState';

export interface IAllMessageState {
  messages: IMessage[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
  retry: boolean;
}

export interface IMessagesState {
  allMessages: IAllMessageState;
}
