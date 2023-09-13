import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BANKS } from '@commons/constants/banks';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  INicknamesResponse,
  IRespondServiceProducts
} from '@modules/main-container/entities/main-products.entities';
import { Product } from '@commons/models/product.model';
import {
  IPocketDetailRequest,
  IPocketDetailResponse,
  IPockets
} from '@commons/entities/pockets.entities';
import { IPayRollLoansAll } from '@app/commons/entities/pay-rolls-loans.entities';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public allProducts(): Observable<IRespondServiceProducts> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: ''
    };

    const url = urlBuilder.services(environment.api.services.products.all);
    return this.http.post<IRespondServiceProducts>(url, user);
  }

  public detailProduct(type: string, id: string): Observable<Product> {
    const user = {
      accountId: id,
      accountType: type
    };

    const url = urlBuilder.services(environment.api.services.products.detail);
    return this.http.post<Product>(url, user);
  }

  public fetchPockets(): Observable<IPockets> {
    const body = {
      companyId: BANKS.BANCO_POPULAR
    };

    const url = urlBuilder.services(environment.api.services.pockets.home);
    return this.http.post<IPockets>(url, body);
  }

  public pocketDetail(
    basicPocket: IPocketDetailRequest
  ): Observable<IPocketDetailResponse> {
    const url = urlBuilder.services(environment.api.services.pockets.detail);
    return this.http.post<IPocketDetailResponse>(url, basicPocket);
  }

  public fetchRollLoans(): Observable<IPayRollLoansAll> {
    const url = urlBuilder.services(
      environment.api.services.products.payrollloans
    );
    return this.http.post<IPayRollLoansAll>(url, {});
  }

  public fetchNicknames(): Observable<INicknamesResponse> {
    const url = urlBuilder.services(environment.api.services.nicknames.all);
    return this.http.post<INicknamesResponse>(url, {});
  }
}
