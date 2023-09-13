import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Action } from '@ngrx/store';

import { PocketsService } from '@modules/pockets/services/pockets.service';
import * as createAction from '@modules/pockets/store/actions/create-pockets.action';
import * as editAction from '@modules/pockets/store/actions/edit-pockets.action';
import * as moveAction from '@modules/pockets/store/actions/move-pockets.action';
import * as deleteAction from '@modules/pockets/store/actions/delete-pockets.action';
import * as categoriesAction from '@modules/pockets/store/actions/categories-pockets.action';
import {
  ICreatePocketResponse,
  IDeletePocketResponse,
  IEditPocketResponse,
  IMovePocketResponse,
  IPocketsCategoriesResponse
} from '@modules/pockets/entities/pockets.entities';

@Injectable()
export class PocketsModuleEffect {
  constructor(
    private actions$: Actions,
    private pocketsService: PocketsService,
    private translateService: TranslateService
  ) {}

  CreatePocket: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(createAction.createPocketLoadAction),
      switchMap((action) => {
        return this.pocketsService.createPocket(action.request).pipe(
          first(),
          map((resp: ICreatePocketResponse) =>
            resp?.success
              ? createAction.createPocketSuccessAction(resp)
              : createAction.createPocketFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              createAction.createPocketFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  EditPocket: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(editAction.editPocketLoadAction),
      switchMap((action) => {
        return this.pocketsService.editPocket(action.request).pipe(
          first(),
          map((resp: IEditPocketResponse) =>
            resp?.success
              ? editAction.editPocketSuccessAction(
                  resp,
                  this.translateService.instant('POCKETS.EDIT.POCKET_EDITED')
                )
              : editAction.editPocketFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              editAction.editPocketFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  MovePocket: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(moveAction.movePocketLoadAction),
      switchMap((action) => {
        return this.pocketsService.movePocket(action.request).pipe(
          first(),
          map((resp: IMovePocketResponse) =>
            resp?.success
              ? moveAction.movePocketSuccessAction(resp)
              : moveAction.movePocketFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              moveAction.movePocketFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  DeletePocket: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAction.deletePocketLoadAction),
      switchMap((action) => {
        return this.pocketsService.deletePocket(action.request).pipe(
          first(),
          map((resp: IDeletePocketResponse) =>
            resp?.success
              ? deleteAction.deletePocketSuccessAction(
                  resp,
                  this.translateService.instant('POCKETS.EDIT.POCKET_DELETED')
                )
              : deleteAction.deletePocketFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              deleteAction.deletePocketFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );

  LoadPocketsCategories: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesAction.pocketsCategoriesLoadAction),
      switchMap((action) => {
        return this.pocketsService.getCategories().pipe(
          first(),
          map((resp: IPocketsCategoriesResponse) =>
            resp?.success
              ? categoriesAction.pocketsCategoriesSuccessAction(resp.categories)
              : categoriesAction.pocketsCategoriesFailAction(resp.errorMessage)
          ),
          catchError((error) =>
            of(
              categoriesAction.pocketsCategoriesFailAction(
                error?.errorMessage || error.error
              )
            )
          )
        );
      })
    )
  );
}
