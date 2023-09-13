import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IRegisteredAccountRespond } from '@modules/transfer/entities/registered-account.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { BANKS } from '@commons/constants/banks';

@Injectable()
export class RegisteredAccountService {
  constructor(private http: HttpClient) {}

  public registeredAccounts(
    accountId: string,
    accountType: string
  ): Observable<IRegisteredAccountRespond> {
    const account = {
      accountId,
      accountType,
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR
    };
    const url = urlBuilder.services(
      environment.api.services.transfer.affiliation_products
    );

    return this.http.post<IRegisteredAccountRespond>(url, account);
  }
}
