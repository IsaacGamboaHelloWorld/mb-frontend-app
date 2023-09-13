import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  ICertificateGMFState,
  ICertificateIncomeTaxesState,
  ICertificateRACState,
  ICertificateTCState
} from '@modules/documents/tax-certificates/store/tax-certificates.state';
import {
  certificateTCLoadAction,
  certificateTCResetAction
} from '@modules/documents/tax-certificates/store/actions/certificate-tc.action';
import {
  certificateGMF,
  certificateIncomeTaxes,
  certificateRAC,
  certificateTc
} from '@modules/documents/tax-certificates/store/certificate-tc.selector';
import {
  certificateGMFLoadAction,
  certificateGMFResetAction
} from '@modules/documents/tax-certificates/store/actions/certificate-gmf.action';
import {
  certificateIncomeTaxesLoadAction,
  certificateIncomeTaxesResetAction
} from '@modules/documents/tax-certificates/store/actions/certificate-income-taxes.action';
import {
  certificateRACLoadAction,
  certificateRACResetAction
} from '@modules/documents/tax-certificates/store/actions/certificate-rac.action';

@Injectable()
export class TaxCertificatesFacade extends MainContainerFacade {
  public certificateTc$: Observable<ICertificateTCState> = this.store.pipe(
    select(certificateTc)
  );

  public certificateGMF$: Observable<ICertificateGMFState> = this.store.pipe(
    select(certificateGMF)
  );

  public certificateIncomeTaxes$: Observable<
    ICertificateIncomeTaxesState
  > = this.store.pipe(select(certificateIncomeTaxes));

  public certificateRAC$: Observable<ICertificateRACState> = this.store.pipe(
    select(certificateRAC)
  );

  public fetchCertificateTc(): void {
    this.store.dispatch(certificateTCLoadAction());
  }

  public fetchCertificateGMF(period: string): void {
    this.store.dispatch(certificateGMFLoadAction({ taxYear: period }));
  }

  public fetchCertificateIncomeTaxes(period: string): void {
    this.store.dispatch(certificateIncomeTaxesLoadAction({ taxYear: period }));
  }

  public fetchCertificateRAC(period: string): void {
    this.store.dispatch(certificateRACLoadAction({ taxYear: period }));
  }

  public resetCertificateTc(): void {
    this.store.dispatch(certificateTCResetAction());
  }

  public resetCertificateGMF(): void {
    this.store.dispatch(certificateGMFResetAction());
  }

  public resetCertificateIncomeTaxes(): void {
    this.store.dispatch(certificateIncomeTaxesResetAction());
  }

  public resetCertificateRAC(): void {
    this.store.dispatch(certificateRACResetAction());
  }
}
