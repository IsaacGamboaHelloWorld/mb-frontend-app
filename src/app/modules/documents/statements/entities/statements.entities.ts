import { BANKS } from '@commons/constants/banks';

export interface IAccountInfo {
  accountId: string;
  accountType: string;
}

export interface IPeriodItem {
  startDate: string;
  endDate: string;
  documentType: string;
  periodName: string;
}

export interface IStatement {
  account: IAccountInfo;
  periods: IPeriodItem[];
  success: boolean;
  errorMessage: string;
  type?: string;
}

export interface IPFData {
  accountInformation: IAccountInfo;
  base64: string;
  name: string;
  success: boolean;
  errorMessage: string;
}

export interface IServicePeriod {
  accountId: string;
  accountType: string;
  companyId: string;
  requestId: number;
}

export interface IServiceStatementFile {
  accountId: string;
  accountType: string;
  companyId: string;
  requestId: number;
  fileDesc: string;
  endDt: string;
  startDt: string;
}
