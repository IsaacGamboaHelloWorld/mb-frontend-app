import { INewTransferRespond } from '@modules/transfer/entities/transfer.entities';
import { IRegisteredAccount } from '@modules/transfer/entities/registered-account.entities';
import { IConsTransferResp } from '@modules/transfer/entities/cost-transfer.entities';

export const newTransferFeatureName = 'newTransferModuleState';

export interface INewTransferState {
  information: INewTransferRespond;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ICostTransferState {
  information: IConsTransferResp;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IRegisteredAccountState {
  products: IRegisteredAccount[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface INewTransfersState {
  newTransfer: INewTransferState;
  registeredAccounts: IRegisteredAccountState;
  costTransfer: ICostTransferState;
}
