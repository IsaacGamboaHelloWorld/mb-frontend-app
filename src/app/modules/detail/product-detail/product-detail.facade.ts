import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '../../main-container/main-container.facade';
import { IMovementsState } from '@modules/detail/product-detail/store/states/movements.state';
import { movements } from '@modules/detail/product-detail/store/detail-product.selector';
import {
  movementsLoadAction,
  movementsResetAction
} from '@modules/detail/product-detail/store/actions/movements.action';

@Injectable()
export class ProductDetailFacade extends MainContainerFacade {
  public movements$: Observable<IMovementsState> = this.store.pipe(
    select(movements)
  );

  public fetchMovements(
    type: string,
    id: string,
    from: string = '',
    to: string = ''
  ): void {
    this.store.dispatch(movementsLoadAction(type, id, from, to));
  }

  public resetMovements(): void {
    this.store.dispatch(movementsResetAction());
  }
}
