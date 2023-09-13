import { IMovementTuplus } from '@modules/tuplus/entities/movement-tuplus.entities';

export interface IMovementsTuplusState {
  information: IMovementTuplus;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
