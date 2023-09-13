import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IQrAnnulmentBody,
  IQrAnnulmentService,
  IQrPaymentBody
} from '@modules/qr/new-payment/entities/qr.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class QrService {
  constructor(private http: HttpClient) {}

  public qrPayment(body: IQrPaymentBody): Observable<IQrAnnulmentService> {
    const url = urlBuilder.services(environment.api.services.qr.payment);
    return this.http.post<IQrAnnulmentService>(url, body);
  }

  public qrAnnulment(body: IQrAnnulmentBody): Observable<any> {
    const url = urlBuilder.services(environment.api.services.qr.annulment);
    return this.http.post<IQrAnnulmentService>(url, body);
  }
}
