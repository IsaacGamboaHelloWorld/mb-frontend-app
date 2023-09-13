import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

import { AuthService } from '@commons/services/auth/auth.service';
import * as actions from '@modules/auth/store/auth.actions';
import { IEnrollmentResponse } from '@modules/auth/entities/auth.interface';
import { redirectEnrollment } from '@modules/auth/mappers/redirect.mapper';
import { AuthFacade } from '@modules/auth/auth.facade';
import { ModalService } from '@commons/services/modal.service';
import { ContModalAuthComponent } from '@modules/auth/pages/login/components/cont-modal-auth/cont-modal-auth.component';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';

@Injectable()
export class AuthEffect {
  constructor(
    private navController: NavController,
    private actions$: Actions,
    private service: AuthService,
    private facade: AuthFacade,
    private modalService: ModalService,
    private translateService: TranslateService
  ) {}

  fetchAuthEnrollmentEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.startAuthAction),
      switchMap((action) =>
        this.service.login(action.authData).pipe(
          take(1),
          map((content: IEnrollmentResponse) => {
            redirectEnrollment(
              content,
              this.navController,
              this.facade,
              this.translateService,
              this.modalService
            );
            return actions.enrollmentStepSuccessAction({ content });
          }),

          catchError((error: IEnrollmentResponse) => {
            if (
              error.errorMessage ===
              this.translateService.instant('USER_BLOCKED')
            ) {
              this.openModal();
              return of(actions.enrollmentStepErrorAction());
            }
          }),

          catchError((error: HttpErrorResponse) => {
            this.modalService.openModal(ContModalAuthComponent, {
              title: this.translateService.instant('AUTH.ERROR.TITLE'),
              description: this.translateService.instant(
                'AUTH.ERROR.DESCRIPTION'
              ),
              firstBtn: this.translateService.instant('AUTH.ERROR.BTN')
            });
            return of(actions.enrollmentStepErrorAction());
          })
        )
      )
    )
  );

  public openModal() {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-warning-hex',
        iconType: 'warning',
        title: this.translateService.instant('AUTH.BLOCKED.TITLE'),
        hasInLineLink: true,
        description: this.translateService.instant('AUTH.BLOCKED.DESCRIPTION'),
        firstBtn: this.translateService.instant('UNDERSTOOD')
      },
      'default-modal',
      false,
      true
    );
  }
}
