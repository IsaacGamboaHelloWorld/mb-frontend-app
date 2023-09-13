import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '@commons/models/product.model';
import { ITransferWithdrawalState } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.state';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class TransferWithdrawalFacadeMock extends MainContainerFacadeMock {
  public transferWithdrawal$: Observable<
    ITransferWithdrawalState
  > = new BehaviorSubject({
    response: null,
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });

  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public fetchTransferWithdrawal(): void {}
  public resetTransferWithdrawal(): void {}

  public filterProducts$(): Observable<any[]> {
    return new BehaviorSubject([]);
  }
}
