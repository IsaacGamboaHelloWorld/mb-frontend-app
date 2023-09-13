import { SharedDownloadFileAbstract } from '@modules/documents/utils/shared-download-file.abstract';
import { Injectable, Injector } from '@angular/core';
import { TaxCertificatesFacade } from '@modules/documents/tax-certificates/tax-certificates.facade';
import { Observable } from 'rxjs';
import {
  ICertificateGMFState,
  ICertificateIncomeTaxesState,
  ICertificateRACState,
  ICertificateTCState
} from '@modules/documents/tax-certificates/store/tax-certificates.state';

@Injectable()
export abstract class TaxCertificatesAbstract extends SharedDownloadFileAbstract {
  protected taxCertificatesFacade: TaxCertificatesFacade;

  protected constructor(protected injector: Injector) {
    super(injector);
    this.taxCertificatesFacade = this.injector.get(TaxCertificatesFacade);
  }

  get certificateTc$(): Observable<ICertificateTCState> {
    return this.taxCertificatesFacade.certificateTc$;
  }

  get certificateGMF$(): Observable<ICertificateGMFState> {
    return this.taxCertificatesFacade.certificateGMF$;
  }

  get certificateIncomeTaxes$(): Observable<ICertificateIncomeTaxesState> {
    return this.taxCertificatesFacade.certificateIncomeTaxes$;
  }

  get certificateRAC$(): Observable<ICertificateRACState> {
    return this.taxCertificatesFacade.certificateRAC$;
  }
}
