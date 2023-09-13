import {
  ICreatePocketResponse,
  IDeletePocketResponse,
  IEditPocketResponse,
  IMovePocketResponse
} from '@modules/pockets/entities/pockets.entities';

export const pocketsFeatureName = 'pocketsModuleState';

export interface ICreatePocketState {
  response: ICreatePocketResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IEditPocketState {
  response: IEditPocketResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IMovePocketState {
  response: IMovePocketResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IDeletePocketState {
  response: IDeletePocketResponse;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPocketsCategoriesState {
  information: string[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IPocketsState {
  createPocket: ICreatePocketState;
  editPocket: IEditPocketState;
  movePocket: IMovePocketState;
  deletePocket: IDeletePocketState;
  pocketsCategories: IPocketsCategoriesState;
}
