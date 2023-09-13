import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BANKS } from '@commons/constants/banks';
import { environment } from '@environment/environment';
import { urlBuilder } from '@commons/utils/url-builder';
import { IMovement } from '@modules/detail/product-detail/entities/movements.entities';

@Injectable()
export class MovementsService {
  constructor(private http: HttpClient) {}

  public fetchMovements(
    type: string,
    id: string,
    from: string,
    to: string
  ): Observable<IMovement> {
    const PRODUCT = {
      accountId: id,
      accountType: type,
      currency: 'COP',
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      dateMovementsFrom: from,
      dateMovementsTo: to
    };

    const url = urlBuilder.services(
      environment.api.services.products.movements
    );
    return this.http.post<IMovement>(url, PRODUCT);
  }
}
