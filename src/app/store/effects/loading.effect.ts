import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  disableLoadingAction,
  DisableLoadingObserverActionsTypes,
  enableLoadingAction,
  EnableLoadingObserverActionsTypes
} from '@store/actions/loading.action';
import { LoadingProperties } from '@commons/entities/loading.entities';

@Injectable()
export class LoadingEffect {
  constructor(
    private actions$: Actions,
    public loadingController: LoadingController
  ) {}

  enableLoadingEffect: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(enableLoadingAction),
        tap((action) => this.enableLoadingWithOptions(action.payload))
      ),
    { dispatch: false }
  );

  disableLoadingEffect: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(disableLoadingAction),
        tap(() => this.disableLoading())
      ),
    { dispatch: false }
  );

  enableLoadingObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...EnableLoadingObserverActionsTypes),
      map(() => enableLoadingAction({ payload: {} }))
    )
  );

  disableLoadingObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...DisableLoadingObserverActionsTypes),
      map(() => disableLoadingAction())
    )
  );

  async enableLoadingWithOptions(properties: LoadingProperties): Promise<void> {
    const loadingActive = await this.loadingController.getTop();
    if (!loadingActive) {
      const loading = await this.loadingController.create(properties);
      loading.present();
    }
  }

  async disableLoading(): Promise<void> {
    const loadingActive = await this.loadingController.getTop();
    if (!!loadingActive) {
      await this.loadingController.dismiss();
    }
  }
}
