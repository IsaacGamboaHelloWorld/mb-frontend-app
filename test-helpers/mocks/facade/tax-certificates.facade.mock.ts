import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import {
  ICertificateGMFState,
  ICertificateIncomeTaxesState,
  ICertificateRACState,
  ICertificateTCState
} from '@modules/documents/tax-certificates/store/tax-certificates.state';
import { initCertificateTc } from '@modules/documents/tax-certificates/store/reducers/certificate-tc.reducer';
import { initCertificateGMF } from '@modules/documents/tax-certificates/store/reducers/certificate-gmf.reducer';
import { initCertificateIncomeTaxes } from '@modules/documents/tax-certificates/store/reducers/certificate-income-taxes.reducer';
import { initCertificateRAC } from '@modules/documents/tax-certificates/store/reducers/certificate-rac.reducer';

@Injectable()
export class TaxCertificatesFacadeMock extends MainContainerFacadeMock {
  public certificateTc$: Observable<ICertificateTCState> = new BehaviorSubject(
    initCertificateTc
  );

  public certificateGMF$: Observable<
    ICertificateGMFState
  > = new BehaviorSubject(initCertificateGMF);

  public certificateRAC$: Observable<
    ICertificateRACState
  > = new BehaviorSubject(initCertificateRAC);

  public certificateIncomeTaxes$: Observable<
    ICertificateIncomeTaxesState
  > = new BehaviorSubject(initCertificateIncomeTaxes);

  public fetchCertificateTc(): void {}
  public fetchCertificateGMF(period: string): void {}
  public fetchCertificateRAC(period: string): void {}
  public fetchCertificateIncomeTaxes(period: string): void {}
  public resetCertificateTc(): void {}
  public resetCertificateGMF(): void {}
  public resetCertificateRAC(): void {}
  public resetCertificateIncomeTaxes(): void {}
}
