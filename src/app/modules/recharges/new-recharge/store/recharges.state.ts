import { IRespondRecharge } from '@modules/recharges/new-recharge/entities/recharge.entities';
import { IOperator } from '@modules/recharges/new-recharge/entities/operatators.entities';

export const rechargeFeatureName = 'rechargeModuleState';

export interface IRechargeState {
  form: IRespondRecharge;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IOperatorsState {
  names: IOperator[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
export interface IRechargesState {
  recharge: IRechargeState;
  operators: IOperatorsState;
}
