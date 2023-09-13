import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  blockProductLoadAction,
  blockProductResetAction
} from '@modules/block-product/store/actions/block-product.action';
import {
  debitCardListLoadAction,
  debitCardListResetAction
} from '@modules/block-product/store/actions/debit-cards.action';
import { IBlockProductBody } from '@modules/block-product/entities/block.entities';
import {
  IBlockProductState,
  IDebitCardListState
} from '@modules/block-product/store/block-product.state';
import {
  blockProduct,
  debitCard
} from '@modules/block-product/store/block-product.selector';

@Injectable()
export class BlockProductsFacade extends MainContainerFacade {
  public blockProduct$: Observable<IBlockProductState> = this.store.pipe(
    select(blockProduct)
  );

  public debitCards$: Observable<IDebitCardListState> = this.store.pipe(
    select(debitCard)
  );

  public fetchBlockProduct(body: IBlockProductBody): void {
    this.store.dispatch(blockProductLoadAction(body));
  }

  public fetchDebitCardList(): void {
    this.store.dispatch(debitCardListLoadAction());
  }

  public resetBlockProduct(): void {
    this.store.dispatch(blockProductResetAction());
  }

  public resetDebitCards(): void {
    this.store.dispatch(debitCardListResetAction());
  }
}
