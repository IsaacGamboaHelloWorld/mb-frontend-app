import { BANKS } from '@commons/constants/banks';

import {
  IPeriodItem,
  IServicePeriod,
  IServiceStatementFile
} from '@modules/documents/statements/entities/statements.entities';

export const periodMapper = (
  accountId: string,
  accountType: string
): IServicePeriod => {
  return {
    accountId,
    accountType: accountType?.toUpperCase(),
    companyId: BANKS.BANCO_POPULAR,
    requestId: Math.floor(Date.now() / 1000)
  };
};

export const statementsFileMapper = (
  accountId: string,
  accountType: string,
  period: IPeriodItem
): IServiceStatementFile => {
  return {
    accountId,
    accountType: accountType?.toUpperCase(),
    companyId: BANKS.BANCO_POPULAR,
    requestId: Math.floor(Date.now() / 1000),
    fileDesc: period?.periodName,
    endDt: period?.endDate,
    startDt: period?.startDate
  };
};
