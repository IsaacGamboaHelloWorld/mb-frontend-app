import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  toastAction,
  ToastObserverActionsTypes
} from '@store/actions/toast.action';
import { IToastProperties } from '@commons/entities/toast.entities';

@Injectable()
export class ToastEffect {
  constructor(
    private actions$: Actions,
    public toastController: ToastController
  ) {}

  toastEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toastAction),
        tap((action) => this.toastWithOptions(action.payload))
      ),
    { dispatch: false }
  );

  alertObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...ToastObserverActionsTypes),
      map((action) => toastAction(action))
    )
  );

  async toastWithOptions(properties: IToastProperties): Promise<void> {
    const toastActive = await this.toastController.getTop();
    if (!toastActive) {
      const toast = await this.toastController.create(properties);
      toast.present();
    }
  }
}
