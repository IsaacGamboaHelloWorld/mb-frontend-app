import { SharedDownloadFileAbstract } from '@modules/documents/utils/shared-download-file.abstract';
import { Injectable, Injector } from '@angular/core';
import { CertificatesFacade } from '@modules/documents/certificates/certificates.facade';
import { Observable } from 'rxjs';
import { ICertificateState } from '@modules/documents/certificates/store/certificate.state';
import { Product } from '@commons/models/product.model';
import { GROUP_ONE, GROUP_TWO } from '@commons/constants/group-products';

@Injectable()
export abstract class CertificatesAbstract extends SharedDownloadFileAbstract {
  protected certificatesFacade: CertificatesFacade;

  protected constructor(protected injector: Injector) {
    super(injector);
    this.certificatesFacade = this.injector.get(CertificatesFacade);
  }

  get products$(): Observable<Product[]> {
    return this.certificatesFacade.filterProducts$(GROUP_ONE);
  }

  get certificate$(): Observable<ICertificateState> {
    return this.certificatesFacade.certificate$;
  }
}
