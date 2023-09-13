export interface ICreatePocketRequest {
  parentAccountId: string;
  parentAccountType: string;
  pocketName: string;
  pocketPeriod: string;
  savingAmount: number;
  periodicAmount: number;
  openingAmount: number;
  category: string;
}

export interface ICreatePocketResponse extends IGenericPocketsResponse {
  request: {
    parentAccountId: string;
    parentAccountType: string;
    pocketName: string;
    pocketPeriod: string;
    savingAmount: number;
    periodicAmount: number;
    openingAmount: number;
    category: string;
    id: string;
    idType: string;
    customerId: string;
    customerIdType: string;
    deviceId?: string;
    companyId: string;
    ipAddress: string;
  };
}

export interface IEditPocketRequest {
  category: string;
  parentAccountId: string;
  parentAccountType: string;
  periodicAmount: number;
  pocketId: string;
  pocketName: string;
  pocketPeriod: string;
  pocketType: string;
  savingAmount: number;
}

export interface IEditPocketResponse {
  success: boolean;
  errorMessage?: string;
}

export interface IMovePocketRequest {
  parentAccountId: string;
  parentAccountType: string;
  pocketIdFrom: string;
  pocketTypeFrom: string;
  pocketIdTo: string;
  pocketTypeTo: string;
  amount: number;
  pocketName?: string;
  pocketPeriod?: string;
}

export interface IMovePocketResponse extends IGenericPocketsResponse {
  request: {
    parentAccountId: string;
    parentAccountType: string;
    pocketIdFrom: string;
    pocketTypeFrom: string;
    pocketIdTo: string;
    pocketTypeTo: string;
    amount: number;
    id: string;
    idType: string;
    customerId: string;
    customerIdType: string;
    deviceId?: string;
    companyId: string;
    ipAddress: string;
  };
}

export interface IDeletePocketRequest {
  pocketId: string;
  pocketType: string;
  parentAccountId: string;
  parentAccountType: string;
}

export interface IDeletePocketResponse extends IGenericPocketsResponse {
  request: {
    pocketId: string;
    pocketType: string;
    parentAccountId: string;
    parentAccountType: string;
    id: string;
    idType: string;
    customerId: string;
    customerIdType: string;
    deviceId: string;
    companyId: string;
    ipAddress: string;
  };
}

export interface IPocketsCategoriesResponse {
  categories: string[];
  success: boolean;
  errorMessage?: string;
}

export interface IGenericPocketsResponse {
  approvalId: string;
  rqUid: string;
  errorMessage: string;
  specificErrorMessage: string;
  success: boolean;
  dateTime: string;
  hiddenToast?: boolean;
}
