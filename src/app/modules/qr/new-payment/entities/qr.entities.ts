export interface IQrProductsBody {
  acctType: string;
}

export interface IQrInfoBody {
  qrMetaData: string;
}

export interface IQrPaymentBody {
  qrMetadata: string;
  paymentMethodId: string;
  numberOfInstalments: string;
  brand: string;
}

export interface IQrAnnulmentBody {
  qrMetaData: string;
}

export interface IQrAnnulmentService {
  transaction: {
    clientDt: string;
    finalPrcDt: string;
    trnRqUID: string;
    trnSrc: string;
  };
  postAddr: {
    city: string;
    stateProv: string;
    country: string;
  };
  numberOfInstalments?: string;
  paymentMethod: IQrProduct;
  date: string;
  qrInfo: IQrInfo;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  error: boolean;
}

export interface IQrInfoService {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  qrInfo: IQrInfo;
  success: boolean;
  error: boolean;
}

export interface IQrProductsService {
  paymentsMethods: IQrProduct[];
  success: boolean;
  errorMessage: string;
  error: boolean;
}

export interface IQrProduct {
  id: string;
  accountType: string;
  accountBalance: string;
  accountId: string;
}

export interface IQrInfo {
  emvIndicator: string;
  qrType: string;
  crc: string;
  securityHashCode: string;
  terminal: string;
  acquirerCode: string;
  merchantCode: string;
  ivaValue: string;
  incValue: string;
  merchantAggregatorCode: string;
  merchantCategoryCode: string;
  countryCode: string;
  merchantName: string;
  merchantCity: string;
  postalCode: string;
  channelCode: string;
  ivaConditionCode: string;
  ivaDomain: string;
  ivaBaseValue: string;
  incConditionCode: string;
  currencyCode: string;
  transactionAmount: string;
  trnConsecutiveCode: string;
  tipIndicator: string;
  tipValue: string;
  tipPercentage: string;
  languagePreference: string;
  billingNumber: string;
  mobileNUmber: string;
  storeLabel: string;
  loyaltyNumber: string;
  referenceLabel: string;
  customerLabel: string;
  trxPurpose: string;
  additionalConsumerData: string;
  merchantLanguageName: string;
  merchantLanguageCity: string;
  acquirerDomain: string;
  securityHashDomain: string;
  merchantDomain: string;
  channelDomain: string;
  ivaConditionDomain: string;
  ivaBaseDomain: string;
  incConditionDomain: string;
  trnConsecutiveDomain: string;
  incDomain: string;
}
