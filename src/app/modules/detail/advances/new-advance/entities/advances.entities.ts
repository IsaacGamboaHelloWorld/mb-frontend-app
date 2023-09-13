export interface IAdvanceResponse {
  approvalId: string;
  details: IAdvanceDetail;
  success: boolean;
  errorMessage: string;
  hiddenToast?: boolean;
}

export interface IAdvanceService {
  accountFromInformation: IAccountFromInformation;
  accountToInformation: IAccountToInformation;
  advanceInformation: IReqAdvanceInformation;
  channel?: string;
}

export interface IAdvanceDetail {
  companyId: string;
  accountFromInformation: IAccountFromInformation;
  accountToInformation: IAccountToInformation;
  advanceInformation: IAdvanceInformation;
}

export interface IAccountFromInformation {
  accountIdentifier: string;
  productType: string;
  bank: string;
  expirationMonth: string;
  expirationYear: string;
}

export interface IAccountToInformation {
  accountIdentifier: string;
  productType: string;
  bank: string;
}

export interface IAdvanceInformation {
  amount: number;
  currencyCode: string;
  description: string;
  numberFees: number;
  transactionCost: number;
  transactionDate: string;
}

export interface IReqAdvanceInformation {
  amount: string;
  currencyCode: string;
  description: string;
  numberFees: number;
}
