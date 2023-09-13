export interface IOtpWithdrawalResponse {
  otp: string;
  validityTime: string;
  errorMessage: string;
  success: boolean;
  request?: {
    accountId: string;
    accountType: string;
    cityId: string;
    serviceCode: string;
    nie: string;
    invoiceNumber: string;
    amount: string;
    serviceCompanyName?: string;
    currencyCode: string;
    ipAddress: string;
  };
}

export interface IOtpWithdrawal {
  otpChannel: string;
  amount: string;
  accountId: string;
  accountType: string;
  currency: string;
  otpType: string;
  smsMessage: string;
  revocation: boolean;
  sendBySMS: boolean;
  beneficiaryId: number;
}
