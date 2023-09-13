import { IMovement } from '@modules/detail/product-detail/entities/movements.entities';

export interface IMovementsState {
  information: IMovement;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
