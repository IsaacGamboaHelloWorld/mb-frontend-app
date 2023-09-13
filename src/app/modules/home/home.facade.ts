import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { BANKS_OTHER } from '@commons/constants/banks';
import {
  otherProductLoad,
  otherProductShow
} from '@modules/home/store/actions/other-products.action';
import { bankServiceMapper } from '@modules/home/mappers/other-products.mapper';
import { IOtherProduct } from '@modules/home/store/home.state';
import {
  avalProducts,
  toggleAval,
  toggleOtherCredits
} from '@modules/home/store/home.selector';
import { otherCreditsToggle } from '@modules/home/store/actions/other-credits.action';

@Injectable()
export class HomeFacade extends MainContainerFacade {
  public otherProducts$: Observable<IOtherProduct[]> = this.store.pipe(
    select(avalProducts)
  );

  public toggleProducts$: Observable<boolean> = this.store.pipe(
    select(toggleAval)
  );

  public toggleCredits$: Observable<boolean> = this.store.pipe(
    select(toggleOtherCredits)
  );

  public changeToggleAval(toggle: boolean): void {
    this.store.dispatch(otherProductShow(toggle));
  }

  public changeToggleCredits(toggle: boolean): void {
    this.store.dispatch(otherCreditsToggle(toggle));
  }

  public loadOtherBanks(): void {
    BANKS_OTHER.forEach((bank: string) => this.loadOtherBank(bank));
  }

  public loadOtherBank(bank: string): void {
    this.store.dispatch(otherProductLoad(bankServiceMapper(bank)));
  }
}
