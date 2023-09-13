import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  editPocketLoadAction,
  editPocketResetAction
} from '@modules/pockets/store/actions/edit-pockets.action';
import {
  ICreatePocketState,
  IDeletePocketState,
  IEditPocketState,
  IMovePocketState,
  IPocketsCategoriesState
} from '@modules/pockets/store/pockets.state';
import {
  ICreatePocketRequest,
  IDeletePocketRequest,
  IEditPocketRequest,
  IMovePocketRequest
} from '@modules/pockets/entities/pockets.entities';
import {
  deletePocketLoadAction,
  deletePocketResetAction
} from '@modules/pockets/store/actions/delete-pockets.action';
import {
  categoriesSelector,
  createPocketSelector,
  deletePocketSelector,
  editPocketSelector,
  movePocketSelector
} from '@modules/pockets/store/pockets.selector';
import {
  pocketsCategoriesLoadAction,
  pocketsCategoriesResetAction
} from '@modules/pockets/store/actions/categories-pockets.action';
import {
  createPocketLoadAction,
  createPocketResetAction
} from '@modules/pockets/store/actions/create-pockets.action';
import {
  movePocketLoadAction,
  movePocketResetAction
} from '@modules/pockets/store/actions/move-pockets.action';

@Injectable()
export class PocketsFacade extends MainContainerFacade {
  public createPocket$: Observable<ICreatePocketState> = this.store.pipe(
    select(createPocketSelector)
  );

  public editPocket$: Observable<IEditPocketState> = this.store.pipe(
    select(editPocketSelector)
  );

  public movePocket$: Observable<IMovePocketState> = this.store.pipe(
    select(movePocketSelector)
  );

  public deletePocket$: Observable<IDeletePocketState> = this.store.pipe(
    select(deletePocketSelector)
  );

  public categories$: Observable<IPocketsCategoriesState> = this.store.pipe(
    select(categoriesSelector)
  );

  public createPocket(data: ICreatePocketRequest): void {
    this.store.dispatch(createPocketLoadAction(data));
  }

  public editPocket(data: IEditPocketRequest): void {
    this.store.dispatch(editPocketLoadAction(data));
  }

  public movePocket(data: IMovePocketRequest): void {
    this.store.dispatch(movePocketLoadAction(data));
  }

  public deletePocket(data: IDeletePocketRequest): void {
    this.store.dispatch(deletePocketLoadAction(data));
  }

  public getCategories(): void {
    this.store.dispatch(pocketsCategoriesLoadAction());
  }

  public resetCreatePocket(): void {
    this.store.dispatch(createPocketResetAction());
  }

  public resetEditPocket(): void {
    this.store.dispatch(editPocketResetAction());
  }

  public resetMovePocket(): void {
    this.store.dispatch(movePocketResetAction());
  }

  public resetDeletePocket(): void {
    this.store.dispatch(deletePocketResetAction());
  }

  public resetGetCategories(): void {
    this.store.dispatch(pocketsCategoriesResetAction());
  }
}
