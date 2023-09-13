import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IBodyLoanPayment,
  ILoanPayment,
  IRegisteredLoansResp
} from '@modules/payments/entities/loans.entities';
import { BANKS } from '@commons/constants/banks';

@Injectable()
export class LoansService {
  constructor(private http: HttpClient) {}

  public fetchLoansRegistered(): Observable<IRegisteredLoansResp> {
    const loans = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      language: 'es_CO'
    };
    const url = urlBuilder.services(environment.api.services.payment.loans);
    return this.http.post<IRegisteredLoansResp>(url, loans);
  }

  public fetchLoansPay(body: IBodyLoanPayment): Observable<ILoanPayment> {
    const url = urlBuilder.services(environment.api.services.payment.payLoans);
    return this.http.post<ILoanPayment>(url, body);
  }
}
