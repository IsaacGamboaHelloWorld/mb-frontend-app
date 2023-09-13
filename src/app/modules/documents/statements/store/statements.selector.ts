import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IStatementsState,
  statementsFeatureName
} from '@modules/documents/statements/store/statements.state';

const StatementsState = createFeatureSelector<IStatementsState>(
  statementsFeatureName
);

export const periods = createSelector(
  StatementsState,
  (state) => state.statementsPeriods
);

export const statementsFile = createSelector(
  StatementsState,
  (state) => state.statementsFile
);
