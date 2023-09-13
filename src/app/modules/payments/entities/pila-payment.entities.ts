import { IGenericResponse } from '@modules/payments/entities/tax-payment.entities';

export interface IPilaAgreement {
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

export interface IPilaAgreementsAvailableRequest {
  id?: string;
  idType?: string;
  ipAddress?: string;
  requestId?: string;
  companyId: string;
  cityId?: string;
  organizationIdType: string;
  channel: string;
}

export interface IPilaAgreementsAvailableResponse {
  approvalId?: string;
  errorMessage?: string;
  specificErrorMessage?: string;
  agreements: IPilaAgreement[];
  success: boolean;
}

export interface IPilaInformation {
  id: string;
  idType: string;
  agreementId: string;
  referenceType: string;
  referenceId: string;
}

export interface IPilaInformationRequest {
  requestId?: string;
  ipAddress?: string;
  id?: string;
  idType?: string;
  pilaInformation: IPilaInformation;
}

export interface IPilaInformationResponse {
  approvalId?: string;
  errorMessage: string;
  specificErrorMessage?: string;
  invoiceNumber: string;
  nie: string;
  amount: string;
  success: boolean;
}

export interface IBillerPayment {
  originAccountId: string;
  originAccountType: string;
  originAccountBank: string;
  amount: number;
  currencyCode: string;
  primaryBillerAmount?: number;
  primaryBillerCurrencyCode?: string;
  secondaryBillerAmount?: number;
  secondaryBillerCurrencyCode: string;
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

export interface IPilaPaymentRequest {
  originAccount: {
    accountId: string;
    accountType: string;
  };
  payment: {
    amount: number;
    billerId: string;
    billerName: string;
    invoice: string;
    nie: string;
  };
}

export interface IPilaPaymentResponse {
  additionalErrorMessage: string;
  dateTime: string;
  hiddenToast: boolean;
  request: {
    companyId: string;
    originAccount: {
      accountId: string;
      accountType: string;
    };
    idType: string;
    customerId: string;
    ipAddress: string;
    payment: {
      billerId: string;
      amount: string;
      invoice: string;
      nie: string;
      billerName: string;
    };
    id: string;
    customerIdType: string;
    deviceId: string;
  };
  success: boolean;
  errorMessage: string;
  errorCode: string;
  approvalId: string;
  additionalErrorCode?: string;
  apiStatus?: number;
}
