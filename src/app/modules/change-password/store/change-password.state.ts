import { IChangePasswordResponse } from '@modules/change-password/entities/change-password.entities';

export const changePasswordFeatureName = 'changePasswordModuleState';

export interface IChangePasswordState {
  form: IChangePasswordResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
