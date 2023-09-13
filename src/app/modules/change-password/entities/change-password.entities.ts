export interface IChangePasswordService {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
  deviceSerial: string;
  deviceName: string;
  companyId: string;
  ipAddress: string;
}

export interface IChangePasswordResponse {
  approvalId: string;
  code: string;
  description: string;
  transactionDate: string;
}

export interface ISendMessageService {
  dateTime: string;
  request: {
    companyId: string;
    idType: string;
    customerId: string;
    ipAddress: string;
    notificationType: string;
    id: string;
    customerIdType: string;
    deviceId: string;
  };
  success: boolean;
  approvalId: string;
}

export interface IBodySendMessage {
  notificationType: string;
}
