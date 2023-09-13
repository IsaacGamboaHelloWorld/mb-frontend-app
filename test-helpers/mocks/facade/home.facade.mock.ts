import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { IOtherProduct } from '@modules/home/store/home.state';
import { ITuplusState } from '@modules/main-container/store/states/main-container.state';

@Injectable()
export class HomeFacadeMock extends MainContainerFacadeMock {
  public otherProducts$: Observable<IOtherProduct[]> = new BehaviorSubject([]);
  public toggleProducts$: Observable<IOtherProduct[]> = new BehaviorSubject([]);
  public toggleCredits$: Observable<IOtherProduct[]> = new BehaviorSubject([]);

  public tuplusBalance$: Observable<ITuplusState> = new BehaviorSubject([]);
  public moveScroll$: Observable<boolean> = new BehaviorSubject(false);

  public changeToggle(): void {}
  public loadOtherBanks(): void {}
  public loadOtherBank(): void {}

  public moveScroll(): void {}
  public changeToggleAval(): void {}
  public fetchFreeDestination(): void {}
  public fetchRollLoans(): void {}
  public changeToggleCredits(): void {}
}
