export interface IActiveCreditCardService {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  details: {
    companyId: string;
    accountId: string;
    accountType: string;
  };
  success: boolean;
}
export interface IActiveCreditCardBody {
  accountId: string;
}
