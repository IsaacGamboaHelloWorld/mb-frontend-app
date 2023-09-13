import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IPocketsByProduct } from '@commons/entities/pockets.entities';
import { initEditPocket } from '@modules/pockets/store/reducers/edit-pockets.reducer';
import {
  ICreatePocketState,
  IDeletePocketState,
  IEditPocketState,
  IMovePocketState,
  IPocketsCategoriesState
} from '@modules/pockets/store/pockets.state';
import { initCreatePocket } from '@modules/pockets/store/reducers/create-pockets.reducer';
import { initMovePocket } from '@modules/pockets/store/reducers/move-pockets.reducer';
import { initDeletePocket } from '@modules/pockets/store/reducers/delete-pockets.reducer';
import { initPocketsCategories } from '@modules/pockets/store/reducers/pockets-categories.reducer';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { IDeletePocketRequest } from '@app/modules/pockets/entities/pockets.entities';

@Injectable()
export class PocketsFacadeMock extends MainContainerFacadeMock {
  public createPocket$: Observable<ICreatePocketState> = new BehaviorSubject(
    initCreatePocket
  );

  public editPocket$: Observable<IEditPocketState> = new BehaviorSubject({
    ...initEditPocket,
    completed: true
  });

  public movePocket$: Observable<IMovePocketState> = new BehaviorSubject({
    ...initMovePocket,
    completed: true
  });

  public deletePocket$: Observable<IDeletePocketState> = new BehaviorSubject({
    ...initDeletePocket,
    completed: true
  });

  public categories$: Observable<IPocketsCategoriesState> = new BehaviorSubject(
    initPocketsCategories
  );

  public findPocket$(): Observable<IPocketsByProduct> {
    return new BehaviorSubject(null);
  }

  public createPocket(): void {}

  public editPocket(): void {}

  public movePocket(): void {}

  public deletePocket(data: IDeletePocketRequest): void {}

  public getCategories(): void {}

  public resetCreatePocket(): void {}

  public resetEditPocket(): void {}

  public resetMovePocket(): void {}

  public resetDeletePocket(): void {}

  public resetGetCategories(): void {}
}
