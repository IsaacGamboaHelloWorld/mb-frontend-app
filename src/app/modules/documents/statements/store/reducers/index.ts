import { combineReducers } from '@ngrx/store';

import { featurePeriods as statementsPeriods } from '@modules/documents/statements/store/reducers/period.reducer';
import { featureStatements as statementsFile } from '@modules/documents/statements/store/reducers/statements.reducer';

export const statementsRootReducer = combineReducers({
  statementsPeriods,
  statementsFile
});
