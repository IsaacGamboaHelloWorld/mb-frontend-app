export interface IRegisteredAccount {
  destinationAccountId: string;
  destinationAccountType: string;
  customerId: string;
  customerIdType: string;
  customerName: string;
  email?: string;
  bankId: string;
  bankName: string;
  smallName?: string;
  nameAccount?: string;
}

export interface IRegisteredAccountRespond {
  productAffiliations: IRegisteredAccount[];
  approvalId: string;
  errorMessage: string;
  success: boolean;
}
