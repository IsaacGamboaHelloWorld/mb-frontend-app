import { ILogoutTuplus } from '@modules/tuplus/entities/logout-tuplus.entities';

export interface ILogoutTuplusState {
  information: ILogoutTuplus;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
