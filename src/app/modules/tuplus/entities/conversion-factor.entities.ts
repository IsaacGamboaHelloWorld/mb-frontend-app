export interface IConversionFactor {
  MinCurAmt: ICurAmt;
  MaxCurAmt: ICurAmt;
  OtpInfo: IOtpInfo;
  LoyMemberPartnerInfo: ILoyMemberPartnerInfo;
  ConversionFactor: number;
  Withholding: IWithholding;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}

export interface ILoyMemberPartnerInfo {
  MemberStatusCode: string;
}

export interface ICurAmt {
  Amt: number;
}

export interface IOtpInfo {
  OtpValue: string;
  OtpRequired: boolean;
  MinCurAmt: ICurAmt;
}

export interface IWithholding {
  ValidateFlag: boolean;
  Percent: number;
  MinCurAmt: ICurAmt;
}
