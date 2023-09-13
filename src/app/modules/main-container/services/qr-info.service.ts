import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IQrInfoBody,
  IQrInfoService,
  IQrProductsBody,
  IQrProductsService
} from '@modules/qr/new-payment/entities/qr.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class QrInfoService {
  constructor(private http: HttpClient) {}

  public qrProducts(body: IQrProductsBody): Observable<IQrProductsService> {
    const url = urlBuilder.services(environment.api.services.qr.product);
    return this.http.post<IQrProductsService>(url, body);
  }

  public qrInfo(body: IQrInfoBody): Observable<IQrInfoService> {
    const url = urlBuilder.services(environment.api.services.qr.info);
    return this.http.post<IQrInfoService>(url, body);
  }
}
