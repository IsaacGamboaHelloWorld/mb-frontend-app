import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Params } from '@angular/router';

import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { IPocketsCategoriesState } from '@app/modules/pockets/store/pockets.state';
import { initPocketsCategories } from '@app/modules/pockets/store/reducers/pockets-categories.reducer';

@Injectable()
export class HomePocketsFacadeMock extends MainContainerFacadeMock {
  public routerParams$: Observable<Params> = new BehaviorSubject(null);
  public categories$: Observable<IPocketsCategoriesState> = new BehaviorSubject(
    initPocketsCategories
  );

  public resetCreatePocket(): void {}

  public getCategories(): void {}
}
