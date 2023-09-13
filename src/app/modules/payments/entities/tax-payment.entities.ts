export interface ITaxesCity {
  id: string;
  name: string;
}

export interface ITaxesCitiesRequest {
  ipAddress?: string;
  companyId: string;
  id?: string;
  idType?: string;
}

export interface ITaxesCitiesResponse {
  cities: ITaxesCity[];
  success?: boolean;
  errorMessage?: string;
}

export interface ITaxesAgreement {
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

export interface ITaxesAgreementsRequest {
  id?: string;
  idType?: string;
  customerId?: string;
  customerIdType?: string;
  ipAddress?: string;
  cityId: string;
}

export interface ITaxesAgreementsResponse {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  agreements: ITaxesAgreement[];
  success: boolean;
}

export interface ITaxesAmountReferenceRequest {
  requestId?: string;
  ipAddress?: string;
  companyId: string;
  id?: string;
  idType?: string;
  customerId?: string;
  customerIdType?: string;
  billerId: string;
  invoiceNumber: string;
}

export interface ITaxesAmountReferenceResponse {
  approvalId: string;
  errorMessage?: string;
  specificErrorMessage: string;
  amount: number;
  currencyCode: string;
  effectiveDate: string;
  expirationDate: string;
  dueDate: string;
  success: boolean;
}

export interface ITaxesPaymentRequest {
  id?: string;
  idType?: string;
  ipAddress?: string;
  accountId?: string;
  accountType?: string;
  cityId?: string;
  serviceCode?: string;
  optServiceCode?: string;
  nie?: string;
  invoiceNumber?: string;
  amount?: string;
  currencyCode?: string;
  references?: string[];
  serviceCompanyName?: string;
}

export interface ITaxesPaymentResponse extends IGenericResponse {
  approvalId: string;
  hiddenToast: boolean;
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
  references: string[];
}

export interface IGenericResponse {
  channel?: string;
  id?: string;
  idType?: string;
  customerId?: string;
  customerIdType?: string;
  deviceId?: string;
  companyId?: string;
  ipAddress?: string;
  success: boolean;
  errorMessage?: string;
  specificErrorMessage?: string;
  dateTime?: string;
}
