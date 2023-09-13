import { catchError, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { TaxCertificatesService } from '@modules/documents/tax-certificates/services/tax-certificates.service';
import * as actionsCertificateTC from '@modules/documents/tax-certificates/store/actions/certificate-tc.action';
import * as actionsCertificateGMF from '@modules/documents/tax-certificates/store/actions/certificate-gmf.action';
import * as actionsCertificateIncomeTaxes from '@modules/documents/tax-certificates/store/actions/certificate-income-taxes.action';
import * as actionsCertificateRAC from '@modules/documents/tax-certificates/store/actions/certificate-rac.action';
import { sharedFile } from '@commons/helpers/global.helper';
import {
  ICertificateGMFResponse,
  ICertificateRACResponse
} from '@modules/documents/tax-certificates/entities/tax-certificates.entities';

@Injectable()
export class TaxCertificatesEffect {
  constructor(
    private actions$: Actions,
    private taxCertificatesService: TaxCertificatesService,
    private translateService: TranslateService
  ) {}

  LoadCertificateTc: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCertificateTC.certificateTCLoadAction),
      switchMap((action) => {
        return this.taxCertificatesService.generateCertificateTC().pipe(
          first(),
          map((resp) => {
            if (resp?.success) {
              sharedFile(
                resp?.documentResponse[0]?.trnImage[0]?.binData,
                this._generateFileName('CERTIFICATE_TC.FILE_NAME')
              ).then();
              return actionsCertificateTC.certificateTCSuccessAction(
                this.translateService.instant('CERTIFICATE_TC.SUCCESS')
              );
            }
            return actionsCertificateTC.certificateTCFailAction(
              resp?.errorMessage
            );
          }),
          catchError((_) =>
            of(
              actionsCertificateTC.certificateTCFailAction(
                this.translateService.instant('CERTIFICATE_TC.ERROR')
              )
            )
          )
        );
      })
    )
  );

  LoadCertificateGMF: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCertificateGMF.certificateGMFLoadAction),
      switchMap((action) => {
        return this.taxCertificatesService
          .generateCertificateGMF(action.body)
          .pipe(
            first(),
            map((resp: ICertificateGMFResponse) => {
              if (resp?.success) {
                sharedFile(
                  resp?.base64,
                  this._generateFileName('DOCUMENTS.FILE_NAME.GMF')
                );
                return actionsCertificateGMF.certificateGMFSuccessAction(
                  this.translateService.instant('CERTIFICATE_TC.SUCCESS')
                );
              }
              return actionsCertificateGMF.certificateGMFFailAction(
                resp?.errorMessage
              );
            }),
            catchError((_) =>
              of(
                actionsCertificateGMF.certificateGMFFailAction(
                  this.translateService.instant('CERTIFICATE.ERROR')
                )
              )
            )
          );
      })
    )
  );

  LoadCertificateIncomeTaxes: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCertificateIncomeTaxes.certificateIncomeTaxesLoadAction),
      switchMap((action) => {
        return this.taxCertificatesService
          .generateCertificateIncomeTaxes(action.body)
          .pipe(
            first(),
            map((resp: ICertificateGMFResponse) => {
              if (resp?.success) {
                sharedFile(
                  resp?.base64,
                  this._generateFileName('DOCUMENTS.FILE_NAME.INCOME_TAXES')
                );
                return actionsCertificateIncomeTaxes.certificateIncomeTaxesSuccessAction(
                  this.translateService.instant('CERTIFICATE_TC.SUCCESS')
                );
              }
              return actionsCertificateIncomeTaxes.certificateIncomeTaxesFailAction(
                resp?.errorMessage
              );
            }),
            catchError((_) =>
              of(
                actionsCertificateIncomeTaxes.certificateIncomeTaxesFailAction(
                  this.translateService.instant('CERTIFICATE.ERROR')
                )
              )
            )
          );
      })
    )
  );

  LoadCertificateRAC: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCertificateRAC.certificateRACLoadAction),
      switchMap((action) => {
        return this.taxCertificatesService
          .generateCertificateRAC(action.body)
          .pipe(
            first(),
            map((resp: ICertificateRACResponse) => {
              if (resp?.success) {
                sharedFile(
                  resp?.base64,
                  this._generateFileName('DOCUMENTS.FILE_NAME.RAC')
                );
                return actionsCertificateRAC.certificateRACSuccessAction(
                  this.translateService.instant('CERTIFICATE_TC.SUCCESS')
                );
              }
              return actionsCertificateRAC.certificateRACFailAction(
                resp?.errorMessage
              );
            }),
            catchError((_) =>
              of(
                actionsCertificateRAC.certificateRACFailAction(
                  this.translateService.instant('CERTIFICATE.ERROR')
                )
              )
            )
          );
      })
    )
  );

  private _generateFileName(key: string): string {
    const fch: Date = new Date();
    const nowDate = (
      fch.toLocaleDateString() +
      '-' +
      fch.toLocaleTimeString()
    )?.replace(/[/ :]/g, '-');
    const fileName = `${this.translateService.instant(key)}-${nowDate}.pdf`;
    return fileName;
  }
}
