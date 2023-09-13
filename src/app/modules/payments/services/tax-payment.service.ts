import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { urlBuilder } from '@commons/utils/url-builder';
import {
  ITaxesAgreementsRequest,
  ITaxesAgreementsResponse,
  ITaxesAmountReferenceRequest,
  ITaxesAmountReferenceResponse,
  ITaxesCitiesRequest,
  ITaxesCitiesResponse,
  ITaxesPaymentRequest,
  ITaxesPaymentResponse
} from '@modules/payments/entities/tax-payment.entities';

@Injectable()
export class TaxPaymentService {
  constructor(private http: HttpClient) {}

  public loadTaxesCities(
    data: ITaxesCitiesRequest
  ): Observable<ITaxesCitiesResponse> {
    const url = urlBuilder.services(
      environment.api.services.payment.taxes.cities
    );
    return this.http.post<ITaxesCitiesResponse>(url, data);
  }

  public loadTaxesAgreements(
    data: ITaxesAgreementsRequest
  ): Observable<ITaxesAgreementsResponse> {
    const url = urlBuilder.services(
      environment.api.services.payment.taxes.taxes
    );
    return this.http.post<ITaxesAgreementsResponse>(url, data);
  }

  public loadTaxesAmountReference(
    data: ITaxesAmountReferenceRequest
  ): Observable<ITaxesAmountReferenceResponse> {
    const url = urlBuilder.services(
      environment.api.services.payment.taxes.amount
    );
    return this.http.post<ITaxesAmountReferenceResponse>(url, data);
  }

  public taxesPayment(
    data: ITaxesPaymentRequest
  ): Observable<ITaxesPaymentResponse> {
    const url = urlBuilder.services(
      environment.api.services.payment.taxes.payment
    );
    return this.http.post<ITaxesPaymentResponse>(url, data);
  }
}
