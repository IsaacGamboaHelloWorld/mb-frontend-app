import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppFacade } from '@app/app.facade';
import {
  enrollmentResetAction,
  enrollmentStepErrorAction,
  setLoadingAuthAction,
  startAuthAction
} from '@modules/auth/store/auth.actions';
import { IStartAuth } from '@modules/auth/entities/auth.interface';
import { contentEnrollmentSelector } from '@modules/auth/store/auth.selector';
import { IEnrollmentState } from '@modules/auth/store/auth.state';
import { IAuthData } from '@commons/entities/auth-data.entities';
import { setAuthAction } from '@store/actions/global.actions';

@Injectable()
export class AuthFacade extends AppFacade {
  public contentEnrollment$: Observable<IEnrollmentState> = this.store.pipe(
    select(contentEnrollmentSelector)
  );

  public fetchStartAuth(authData: IStartAuth): void {
    this.store.dispatch(startAuthAction({ authData }));
  }

  public resetAuth(): void {
    this.store.dispatch(enrollmentResetAction());
  }

  public setErrorAuth(): void {
    this.store.dispatch(enrollmentStepErrorAction());
  }

  public setLoadingAuth(): void {
    this.store.dispatch(setLoadingAuthAction());
  }

  public setAuthData(form: IAuthData): void {
    this.store.dispatch(setAuthAction(form));
  }
}
