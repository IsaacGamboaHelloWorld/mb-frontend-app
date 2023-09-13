import { IPeriodItem } from '@modules/documents/statements/entities/statements.entities';

export const statementsFeatureName = 'statementsModuleState';

export interface IPeriods {
  periods: IPeriodItem[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IStatementFile {
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IStatementsState {
  statementsPeriods: IPeriods;
  statementsFile: IStatementFile;
}
