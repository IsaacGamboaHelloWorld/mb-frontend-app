import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '@commons/models/product.model';
import {
  INewTransferState,
  IRegisteredAccountState
} from '@modules/transfer/store/transfer.state';
import { initRegisteredAccount } from '@modules/transfer/store/reducers/registerred-account.reducer';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { initNewTransfer } from '@modules/transfer/store/reducers/transfer.reducer';
import { ICostTransferService } from '@modules/transfer/entities/cost-transfer.entities';

@Injectable()
export class NewTransferFacadeMock extends MainContainerFacadeMock {
  public newTransfer$: Observable<INewTransferState> = new BehaviorSubject({
    information: null,
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });
  public registeredAccount$: Observable<
    IRegisteredAccountState
  > = new BehaviorSubject(initRegisteredAccount);

  public costTransfer$: Observable<INewTransferState> = new BehaviorSubject(
    initNewTransfer
  );

  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public fetchNewTransfer(): void {}
  public resetNewTransfer(): void {}
  public fetchRegisteredAccount(): void {}
  public resetCost(): void {}
  public fetchNewTransferNotRegistered(): void {}
  public fetchCost(): void {}

  public resetRegistered(): Observable<any[]> {
    return new BehaviorSubject([]);
  }

  public filterProducts$(): Observable<any[]> {
    return new BehaviorSubject([]);
  }
}
