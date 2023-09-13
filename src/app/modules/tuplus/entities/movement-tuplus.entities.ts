export interface IMovementTuplus {
  ListTransactions: IListTransaction[];
  CurrentPage: number;
  NextPage: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
}

export interface IListTransaction {
  TransactionId: string;
  CancelTrxId: string;
  CardNumber: string;
  AccountPoints: string;
  TotalPoints: string;
  BranchName: string;
  State: string;
  CreatedDt: Date;
  TrnType: string;
  SubStatus: string;
  OverrideReasonCode: string;
  AccumulationItem: IAccumulationItem[];
  TotalAmount: string;
  RedemptionItem: IRedemptionItem[];
}

export interface IAccumulationItem {
  IdAccrualed: string;
  PointName: string;
  AccrualedPoints: string;
  PointsRemaining: string;
  PointsUsedValue: string;
  AccumulationPartner: string;
  EstablishmentCalc: string;
  EstablishDt: Date;
  ExpDt: Date;
  Desc: string;
}

export interface IRedemptionItem {
  AccrualItemID: string;
  ItemCount: string;
  BalType: string;
  Amt: string;
  BalTypeRetencion: string;
  AmtRetencion: string;
  Desc: string;
  DescRetencion: string;
  PartnerName: string;
  Value: string;
}

export interface IRequestMovements {
  companyId: string;
  transactionsRequest: ITransactionsRequest;
}

export interface ITransactionsRequest {
  startDt: Date;
  endDt: Date;
  isPagination: boolean;
  numPage: number;
}
