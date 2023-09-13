import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  activeCreditCardLoadAction,
  activeCreditCardResetAction
} from '@modules/activate-credit-card/store/actions/active-credit-card.action';
import { activeCreditCard } from '@modules/activate-credit-card/store/active-credit-card.selector';
import { IActiveCreditCardState } from '@modules/activate-credit-card/store/active-credit-card.state';
import { IActiveCreditCardBody } from '@modules/activate-credit-card/entities/active-block-credit-card.entities';

@Injectable()
export class HomeActiveFacade extends MainContainerFacade {
  public activeCreditCard$: Observable<
    IActiveCreditCardState
  > = this.store.pipe(select(activeCreditCard));

  public fetchActiveCreditCard(product: IActiveCreditCardBody): void {
    this.store.dispatch(activeCreditCardLoadAction(product));
  }

  public resetActiveCreditCard(): void {
    this.store.dispatch(activeCreditCardResetAction());
  }
}
