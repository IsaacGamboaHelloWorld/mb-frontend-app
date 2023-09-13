export interface ICostTransferService {
  accountFromInformation: {
    accountIdentifier: string;
    productType: string;
  };
  accountToInformation: {
    accountIdentifier: string;
    bank: string;
    productType: string;
  };
}

export interface IConsTransferResp {
  approvalId: string;
  cost: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}
