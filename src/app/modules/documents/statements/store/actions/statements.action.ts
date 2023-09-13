import { createAction } from '@ngrx/store';
import { IServiceStatementFile } from '@modules/documents/statements/entities/statements.entities';

export const statementsLoadAction = createAction(
  '[STATEMENT / API] Statement Load',
  (body: IServiceStatementFile) => ({ body })
);
export const statementsResetAction = createAction(
  '[STATEMENT] Statement Reset'
);
export const statementsSuccessAction = createAction(
  '[STATEMENT / API] Statement Success'
);
export const statementsFailAction = createAction(
  '[STATEMENT / API] Statement Fail',
  (errorMessage: string) => ({ errorMessage })
);
