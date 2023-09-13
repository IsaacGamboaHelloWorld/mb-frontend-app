export interface IFreeDestinationCredit {
  accountIdentifier: string;
  creditCode: string;
  creditName: string;
}

export interface IFreeDestinationAllResponse {
  freeDestinationCredits: IFreeDestinationCredit[];
  errorStatusCode: string;
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}

export interface IFreeDestinationDetail {
  accountIdentifier: string;
  productType?: string;
  clientDate: string;
  creditCode: string;
  creditName: string;
  currentStatus: string;
  totalDueAmount: number;
  nextPaymentAmount: number;
  dueDate: string;
  dueDays: number;
  currentRate: number;
  dueRate: number;
  startDate: string;
  minimumAmountToPay: number;
  outstandingBalance: number;
  approvalAmount: number;
  disburseValue: number;
  term: number;
  success?: boolean;
  loading?: boolean;
  completed?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface IFreeDestinationDetailResponse {
  freeDestinationCredit: IFreeDestinationDetail;
  dateTime?: string;
  errorStatusCode: string;
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}
