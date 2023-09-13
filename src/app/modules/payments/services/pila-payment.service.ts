import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IPilaAgreementsAvailableRequest,
  IPilaAgreementsAvailableResponse,
  IPilaInformationRequest,
  IPilaInformationResponse,
  IPilaPaymentRequest,
  IPilaPaymentResponse
} from '@modules/payments/entities/pila-payment.entities';

@Injectable()
export class PilaPaymentService {
  constructor(private http: HttpClient) {}

  public loadPilaAgreements(
    data: IPilaAgreementsAvailableRequest
  ): Observable<IPilaAgreementsAvailableResponse> {
    const url = urlBuilder.services(
      environment.api.services.payment.searchBilller
    );
    return this.http.post<IPilaAgreementsAvailableResponse>(url, data);
  }

  public loadPilaInformation(
    data: IPilaInformationRequest
  ): Observable<IPilaInformationResponse> {
    const url = urlBuilder.services(
      environment.api.services.payment.pila.information
    );
    return this.http.post<IPilaInformationResponse>(url, data);
  }

  public pilaPayment(
    data: IPilaPaymentRequest
  ): Observable<IPilaPaymentResponse> {
    const url = urlBuilder.services(
      environment.api.services.payment.pila.payment
    );
    return this.http.post<IPilaPaymentResponse>(url, data);
  }
}
