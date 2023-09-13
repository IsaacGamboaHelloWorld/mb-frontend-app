export interface IPaymentBills {
  amount: number;
  primaryBillerAmount: number;
  primaryBillerCurrencyCode: string;
  secondaryBillerAmount: number;
  secondaryBillerCurrencyCode: string;
  biller: boolean;
  billerId: string;
  billerName: string;
  billerNickName: string;
  contract: string;
  currencyCode: string;
  dueDate: string;
  expirationDate: string;
  invoice: string;
  isDonePayment: boolean;
  isScheduledPayment: boolean;
  originAccountId: string;
  originAccountType: string;
  scheduledDate?: string;
  accountType?: string;
  accountId?: string;
  bank?: string;
  secondaryAmount?: string;
  secondaryCurrencyCode?: string;
}

export interface IPaymentBillsListResp {
  approvalId: number;
  billerPayments: IPaymentBills[];
  errorMessage: string;
  success: boolean;
}

export interface IPaymentBillsResp {
  date: string;
  approvalId: number;
  hiddenToast: boolean;
  billerPayment: IPaymentBills;
  errorMessage?: string;
  success: boolean;
  request?: {
    ipAddress: string;
    transactionCost: string;
    companyId: string;
    id: string;
    idType: string;
    currentSystemDate: number;
    notes: string;
    dueDate: string;
    customerIdType: string;
    deviceId: string;
    customerId: string;
  };
}

export interface INewPaymentBillerService {
  billerPayment: {
    amount: number;
    biller?: boolean;
    billerId: string;
    billerName: string;
    billerNickName: string;
    contract: string;
    currencyCode: string;
    dueDate: string;
    expirationDate: string;
    invoice: string;
    isDonePayment: boolean;
    isScheduledPayment: boolean;
    originAccountId: string;
    originAccountType: string;
    primaryBillerAmount: number;
    primaryBillerCurrencyCode: string;
    scheduledDate: string;
    secondaryBillerAmount: string;
    secondaryBillerCurrencyCode: string;
    reference: string;
  };
  companyId: string;
  ipAddress: string;
  language: string;
  requestId: number;
}

export interface IAgreementsBody {
  companyId: string;
  entityName: string;
  organizationIdType?: string;
}

export interface IAgreement {
  organizationIdType: string;
  organizationId: string;
  entityName: string;
  industryCode: string;
  image: string;
  phoneType: string;
  phone: string;
  category: string;
  address: string;
  cityId: string;
  city: string;
  partialPayment: boolean;
  active: boolean;
  onlinePayment: string;
  svcId: string;
  noBillerMainReference: string;
  bankName: string;
  bankCode: string;
}

export interface IAgreementsService {
  agreements: IAgreement[];
  errorMessage: string;
  success: boolean;
}

export interface IBillerDetailBody {
  billerPayment: {
    billerId: string;
    contract: string;
  };
}

export interface IBillerBarcode {
  barCode: string;
}

export interface IBillerBarcodeDetail {
  dateTime: string;
  request: {
    companyId: string;
    idType: string;
    customerId: string;
    ipAddress: string;
    id: string;
    customerIdType: string;
    deviceId: string;
    barCode: string;
  };
  billerPayment: IBillerPaymentBarcode;
  success: boolean;
  errorMessage: string;
  error: boolean;
}

export interface IBillerPaymentBarcode {
  primaryBillerCurrencyCode: string;
  billerId: string;
  cityId: string;
  biller: boolean;
  amount: number;
  isSheduledPayment: boolean;
  contract: string;
  dueDate: string;
  originAccountBank: string;
  scheduledDate: string;
  billerName: string;
  secondaryBillerCurrencyCode: string;
  isDonePayment: boolean;
  reference: string;
  invoice: string;
  currencyCode: string;
  expirationDate: string;
}

export interface IBillerDetailService {
  billerPayment: IBillerDetail;
  errorMessage: string;
  success: boolean;
}

export interface IBillerDetail {
  amount: number;
  currencyCode: string;
  billerId: string;
  billerName: string;
  billerNickName: string;
  contract: string;
  invoice: string;
  dueDate: string;
  scheduledDate: string;
  expirationDate: string;
  isScheduledPayment: boolean;
  isDonePayment: boolean;
}
