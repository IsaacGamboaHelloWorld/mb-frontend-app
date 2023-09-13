import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { ChangePasswordService } from '@modules/change-password/services/change-password.service';
import * as actions from '@modules/change-password/store/change-password.action';
import { IChangePasswordResponse } from '@modules/change-password/entities/change-password.entities';
import { CHANGE_PASSWORD_SUCCESSFUL } from '@commons/constants/navigatie-global';
import { AuthService } from '@commons/services/auth/auth.service';

@Injectable()
export class ChangePasswordEffect {
  constructor(
    private actions$: Actions,
    private changePasswordService: ChangePasswordService,
    private router: Router,
    private authService: AuthService
  ) {}

  LoadChangePassword: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changePasswordLoadAction),
      switchMap((action) => {
        return this.changePasswordService.changePassword(action.form).pipe(
          first(),
          map((resp: IChangePasswordResponse) => {
            this.authService.setData = action.form?.newPassword;
            this.router.navigate([CHANGE_PASSWORD_SUCCESSFUL]);
            return actions.changePasswordSuccessAction(resp);
          }),
          catchError((error) => {
            const err = !!error?.description
              ? error?.description
              : error?.errorMessage;

            return of(actions.changePasswordFailAction(err));
          })
        );
      })
    )
  );
}
