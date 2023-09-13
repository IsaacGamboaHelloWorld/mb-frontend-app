import { IAdvanceResponse } from '@modules/detail/advances/new-advance/entities/advances.entities';

export const advancesFeatureName = 'advancesModuleState';

export interface IAdvanceState {
  response: IAdvanceResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
