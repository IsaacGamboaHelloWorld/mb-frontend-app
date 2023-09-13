import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { ICertificateState } from '@modules/documents/certificates/store/certificate.state';
import { certificate } from '@modules/documents/certificates/store/certificate.selector';
import {
  certificateLoadAction,
  certificateResetAction
} from '@modules/documents/certificates/store/certificate.action';

@Injectable()
export class CertificatesFacade extends MainContainerFacade {
  public certificate$: Observable<ICertificateState> = this.store.pipe(
    select(certificate)
  );

  public fetchCertificate(
    accountId: string,
    accountType: string,
    includeBalance: boolean,
    recipient: string
  ): void {
    this.store.dispatch(
      certificateLoadAction(accountId, accountType, includeBalance, recipient)
    );
  }
  public resetCertificate(): void {
    this.store.dispatch(certificateResetAction());
  }
}
