import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@store/state/state';
import {
  changeStatusAction,
  logoutUserAction,
  setIsLoggedAction
} from '@store/actions/global.actions';
import {
  disableLoadingAction,
  enableLoadingAction
} from '@store/actions/loading.action';
import { toastAction } from '@store/actions/toast.action';
import {
  DEFAULT_TOAST_PROPERTIES,
  IToastProperties
} from '@commons/entities/toast.entities';

@Injectable()
export class AppFacade {
  constructor(protected store: Store<State>) {}

  public isLogged$: Observable<boolean> = this.store.pipe(
    select((store) => store.isLoggedIn)
  );

  public beforeUrl$: Observable<string> = this.store.pipe(
    select((store) => store?.beforeUrl)
  );

  public complementary$: Observable<boolean> = this.store.pipe(
    select((store) => store.authData?.complementary)
  );

  public couldHaveComplementary$: Observable<boolean> = this.store.pipe(
    select((store) => store.authData?.couldHaveComplementary)
  );

  public setIsLogged(isLogged: boolean): void {
    this.store.dispatch(setIsLoggedAction({ isLogged }));
  }

  public logout(): void {
    this.store.dispatch(logoutUserAction());
  }

  public openToast(
    message: string,
    type: 'error' | 'success' | 'warning' | 'info' = 'error'
  ): void {
    const payload: IToastProperties = {
      ...DEFAULT_TOAST_PROPERTIES,
      message,
      cssClass: type + '-toast'
    };
    this.store.dispatch(changeStatusAction(payload));
  }

  public enableLoading(): void {
    this.store.dispatch(enableLoadingAction(null));
  }

  public disableLoading(): void {
    this.store.dispatch(disableLoadingAction());
  }
}
