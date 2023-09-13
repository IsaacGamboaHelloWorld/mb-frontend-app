import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBuilder } from '@commons/utils/url-builder';

import { environment } from '@environment/environment';
import {
  ICertificateGMFResponse,
  ICertificateIncomeTaxesResponse,
  ICertificatePeriodRequest,
  ICertificateRACResponse,
  IRentEntities
} from '@modules/documents/tax-certificates/entities/tax-certificates.entities';

@Injectable()
export class TaxCertificatesService {
  constructor(private http: HttpClient) {}

  public generateCertificateTC(): Observable<IRentEntities> {
    const url = urlBuilder.services(
      environment.api.services.products.certificateTC
    );
    return this.http.post<IRentEntities>(url, {});
  }

  public generateCertificateGMF(
    body: ICertificatePeriodRequest
  ): Observable<ICertificateGMFResponse> {
    const url = urlBuilder.services(
      environment.api.services.products.certificateGMF
    );
    return this.http.post<ICertificateGMFResponse>(url, body);
  }

  public generateCertificateIncomeTaxes(
    body: ICertificatePeriodRequest
  ): Observable<ICertificateIncomeTaxesResponse> {
    const url = urlBuilder.services(
      environment.api.services.products.certificatesIncome
    );
    return this.http.post<ICertificateIncomeTaxesResponse>(url, body);
  }

  public generateCertificateRAC(
    body: ICertificatePeriodRequest
  ): Observable<ICertificateRACResponse> {
    const url = urlBuilder.services(
      environment.api.services.products.certificateRAC
    );
    return this.http.post<ICertificateRACResponse>(url, body);
  }
}
