import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  ICostTransferState,
  INewTransferState,
  IRegisteredAccountState
} from '@modules/transfer/store/transfer.state';
import {
  costTransfer,
  newTransfer,
  registeredAccount
} from '@modules/transfer/store/transfer.selector';
import {
  newTransferLoadAction,
  newTransferNotRegisteredLoadAction,
  newTransferResetAction
} from '@modules/transfer/store/actions/transfer.action';
import {
  registeredAccountLoadAction,
  registeredAccountResetAction
} from '@modules/transfer/store/actions/registered-accounts.action';
import { INewTransferService } from '@modules/transfer/entities/transfer.entities';
import {
  costTransferLoadAction,
  costTransferResetAction
} from '@modules/transfer/store/actions/cost-transfer.action';
import { ICostTransferService } from '@modules/transfer/entities/cost-transfer.entities';

@Injectable()
export class NewTransferFacade extends MainContainerFacade {
  public newTransfer$: Observable<INewTransferState> = this.store.pipe(
    select(newTransfer)
  );

  public registeredAccount$: Observable<
    IRegisteredAccountState
  > = this.store.pipe(select(registeredAccount));

  public costTransfer$: Observable<ICostTransferState> = this.store.pipe(
    select(costTransfer)
  );

  public fetchNewTransfer(form: INewTransferService): void {
    this.store.dispatch(newTransferLoadAction(form));
  }

  public fetchNewTransferNotRegistered(form: INewTransferService): void {
    this.store.dispatch(newTransferNotRegisteredLoadAction(form));
  }

  public resetNewTransfer(): void {
    this.store.dispatch(newTransferResetAction());
  }

  public fetchRegisteredAccount(id: string, type: string): void {
    this.store.dispatch(registeredAccountLoadAction(id, type));
  }

  public resetRegistered(): void {
    this.store.dispatch(registeredAccountResetAction());
  }

  public fetchCost(body: ICostTransferService): void {
    this.store.dispatch(costTransferLoadAction(body));
  }

  public resetCost(): void {
    this.store.dispatch(costTransferResetAction());
  }
}
