import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  IBlockProductState,
  IDebitCardListState
} from '@modules/block-product/store/block-product.state';
import { initDebitCardList } from '@modules/block-product/store/reducers/debit-card-list.reducer';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class BlockProductsFacadeMock extends MainContainerFacadeMock {
  public blockProduct$: Observable<IBlockProductState> = new BehaviorSubject({
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });

  public debitCards$: Observable<IDebitCardListState> = new BehaviorSubject(
    initDebitCardList
  );

  public filterProducts$(): Observable<any[]> {
    return new BehaviorSubject([]);
  }

  public fetchBlockProduct(): void {}
  public fetchDebitCardList(): void {}
  public resetBlockProduct(): void {}
  public resetDebitCards(): void {}
}
