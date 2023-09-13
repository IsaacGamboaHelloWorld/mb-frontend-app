import { createAction } from '@ngrx/store';

export const setSourcePathAction = createAction(
  '[ SOURCEPATH / API] Set Path',
  (url: string) => ({ url })
);
export const resetSourcePathAction = createAction(
  '[SOURCEPATH / API] Reset Path'
);
