import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ICertificateState } from '@modules/documents/certificates/store/certificate.state';
import { initCertificate } from '@modules/documents/certificates/store/certificate.reducer';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class CertificatesFacadeMock extends MainContainerFacadeMock {
  public certificate$: Observable<ICertificateState> = new BehaviorSubject(
    initCertificate
  );
  public fetchCertificate(): void {}
  public resetCertificate(): void {}
}
