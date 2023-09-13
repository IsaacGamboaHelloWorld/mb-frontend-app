import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import * as actions from '@modules/documents/certificates/store/certificate.action';
import { CertificatesService } from '@modules/documents/certificates/services/certificates.service';
import { sharedFile } from '@commons/helpers/global.helper';

@Injectable()
export class CertificateEffect {
  constructor(
    private actions$: Actions,
    private certificateService: CertificatesService,
    private translateService: TranslateService
  ) {}

  LoadCertificate: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.certificateLoadAction),
      switchMap((action) => {
        return this.certificateService
          .fetchCertificates(
            action.accountId,
            action.accountType,
            action.includeBalance,
            action.recipient
          )
          .pipe(
            first(),
            map((resp) => {
              if (resp?.success) {
                sharedFile(resp?.base64, resp?.name);
                return actions.certificateSuccessAction();
              }
              return actions.certificateFailAction(
                this.translateService.instant('CERTIFICATE.ERROR')
              );
            }),
            catchError((_) =>
              of(
                actions.certificateFailAction(
                  this.translateService.instant('CERTIFICATE.ERROR')
                )
              )
            )
          );
      })
    )
  );
}
