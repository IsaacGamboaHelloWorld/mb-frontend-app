import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IAgreementsBody,
  IAgreementsService,
  IBillerBarcode,
  IBillerBarcodeDetail,
  IBillerDetailBody,
  IBillerDetailService,
  INewPaymentBillerService,
  IPaymentBillsListResp,
  IPaymentBillsResp
} from '@modules/payments/entities/billers.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class BillersService {
  constructor(private http: HttpClient) {}

  public listBillers(): Observable<IPaymentBillsListResp> {
    const url = urlBuilder.services(environment.api.services.payment.billers);
    return this.http.post<IPaymentBillsListResp>(url, {});
  }

  public publicBillPayment(
    body: INewPaymentBillerService
  ): Observable<IPaymentBillsResp> {
    const url = urlBuilder.services(
      environment.api.services.payment.payBillers
    );
    return this.http.post<IPaymentBillsResp>(url, body);
  }

  public searchBiller(body: IAgreementsBody): Observable<IAgreementsService> {
    const url = urlBuilder.services(
      environment.api.services.payment.searchBilller
    );
    return this.http.post<IAgreementsService>(url, body);
  }

  public billerDetail(
    body: IBillerDetailBody
  ): Observable<IBillerDetailService> {
    const url = urlBuilder.services(
      environment.api.services.payment.billerDetail
    );
    return this.http.post<IBillerDetailService>(url, body);
  }

  public billerBarcode(body: IBillerBarcode): Observable<IBillerBarcodeDetail> {
    const url = urlBuilder.services(environment.api.services.payment.barcode);
    return this.http.post<IBillerBarcodeDetail>(url, body);
  }
}
