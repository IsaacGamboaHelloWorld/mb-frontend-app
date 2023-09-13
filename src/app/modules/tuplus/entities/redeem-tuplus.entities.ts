export interface IRedeem {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
  errorMessageCode: number;
}
export interface IRedeemBody {
  redemptionRequest: IRedemptionRequest;
}

export interface IRedemptionRequest {
  totalPoints: string;
  curAmt: string;
  accountId: string;
  accountType: string;
  bankId: string;
  bankName: string;
  otpInfo: IOtpInfo;
}

export interface IOtpInfo {
  otpValue: string;
  spRefId: string;
}
