import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { IRespondCertificate } from '@modules/documents/certificates/store/certificate.state';

@Injectable()
export class CertificatesService {
  constructor(private http: HttpClient) {}

  public fetchCertificates(
    accountId: string,
    accountType: string,
    includeBalance: boolean,
    recipient: string
  ): Observable<IRespondCertificate> {
    const url = urlBuilder.services(
      environment.api.services.products.certificate
    );
    return this.http.post<IRespondCertificate>(url, {
      accountId,
      accountType,
      includeBalance,
      recipient
    });
  }
}
