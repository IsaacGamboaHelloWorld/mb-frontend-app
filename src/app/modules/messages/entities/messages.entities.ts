export interface IMessagesService {
  serial: string;
}

export interface IMessagesResponse {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  messages: IMessage[];
  success: boolean;
}

export interface IMessage {
  id: string;
  title: string;
  content: string;
  upDt: string;
  expDt?: string | number;
  startDt: string | number;
  success?: boolean;
  read: boolean;
  old: boolean;
}

export interface IGeneralMessageService {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
  request: {
    idNotification: string[];
  };
}

export interface IBodyDeleteMessage {
  idNotification: string[];
}

export interface IBodyReadMessage {
  idNotification: string;
}
