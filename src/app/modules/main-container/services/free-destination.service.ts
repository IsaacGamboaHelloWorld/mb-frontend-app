import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BANKS } from '@commons/constants/banks';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import {
  IFreeDestinationAllResponse,
  IFreeDestinationDetailResponse
} from '@modules/main-container/entities/free-destination.entities';

@Injectable({
  providedIn: 'root'
})
export class FreeDestinationService {
  constructor(private http: HttpClient) {}

  public allFreeDestination(): Observable<IFreeDestinationAllResponse> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: ''
    };
    const url = urlBuilder.services(
      environment.api.services.products.freeDestination.all
    );

    return this.http.post<IFreeDestinationAllResponse>(url, user);
  }

  public freeDestinationDetail(
    accountId: string
  ): Observable<IFreeDestinationDetailResponse> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: '',
      accountId
    };
    const url = urlBuilder.services(
      environment.api.services.products.freeDestination.product
    );

    return this.http.post<IFreeDestinationDetailResponse>(url, user);
  }
}
