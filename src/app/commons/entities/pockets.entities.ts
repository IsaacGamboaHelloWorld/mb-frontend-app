export interface IPockets {
  currentPocketsByProduct?: IPocketsByProduct[];
  success: boolean;
  errorMessage?: string;
}

export interface IAccountTypePocket {
  accountIdentifier: string;
  productType: string;
  bank?: string;
  currencyCode?: string;
}

export interface IPocketsByProduct {
  parent?: IAccountTypePocket;
  pockets?: IPocket[];
  totalSavedOnPockets?: number;
  success?: boolean;
  errorMessage?: string;
}

export interface IPocket {
  pocketId: string;
  pocketType: string;
  pocketName: string;
  savingGoal: number;
  amountPeriodicSavings: number;
  amountSaved: number;
  pendingAmount: number;
  pocketPeriod?: string;
  pocketPeriodDescription?: string;
  category: string;
  parentAccountId?: string;
  parentAccountType?: string;
  loading?: boolean;
  completed?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface IPocketDetailRequest {
  pocketId: string;
  pocketType: string;
  parentAccountId: string;
  parentAccountType: string;
}

export interface IPocketDetailResponse {
  pockets: IPocket[];
  success: boolean;
  errorMessage?: string;
}
