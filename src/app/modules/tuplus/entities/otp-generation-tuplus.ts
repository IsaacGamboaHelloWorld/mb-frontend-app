export interface IGenerationOtp {
  BankInfo: IBankInfo;
  Transaction: ITransaction;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}

export interface IBankInfo {
  BankIdType: string;
}

export interface ITransaction {
  ApprovalId: string;
}
