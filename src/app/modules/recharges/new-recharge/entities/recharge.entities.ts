export interface IRespondRecharge {
  approvalId: string;
  success: boolean;
  errorMessage: string;
  hiddenToast?: boolean;
  rechargeInfo: {
    accountId: string;
    accountType: string;
    phoneNumber: string;
    amount: string;
    operatorName: string;
    currencyCode: string;
    companyId: string;
    id: string;
    idType: string;
    ipAddress: string;
  };
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

export interface IRechargeService {
  accountId: string;
  accountType: string;
  phoneNumber: string;
  amount: string;
  operatorCode: string;
}
