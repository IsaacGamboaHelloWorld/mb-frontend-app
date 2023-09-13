export interface IRegisteredLoan {
  accountId: string;
  accountType: string;
  bank: string;
  bankName: string;
  loanName: string;
  paymentInformation: string;
  paymentId: string;
}

export interface IRegisteredLoansResp {
  registeredLoans: IRegisteredLoan[];
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}

export interface ILoanPayment {
  amount: number;
  approvalId: string;
  bankName: string;
  date: string;
  hiddenToast: boolean;
  destinationAccount: string;
  destinationAccountType: string;
  destinationClientName: string;
  originAccount: string;
  originAccountType: string;
  transactionCost: string;
  errorDescription?: string;
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

export interface IBodyLoanPayment {
  companyId: string;
  ipAddress: string;
  requestId: number;
  language: string;
  accountPaymentOrigin: {
    accountId: number;
    accountType: string;
    bank: string;
    paymentInformation: string;
  };
  accountPaymentDestination: {
    accountId: number;
    accountType: string;
    bank;
    loanName: string;
    newLoan: boolean;
    brandId: string;
  };
  transactionValue: {
    amount: number;
    currencyCode: string;
  };
  clientApp: {
    name: string;
  };
}

export interface IOtherValue {
  title: string;
  value: string;
}
