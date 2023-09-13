import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { IDebitCardListService } from '@modules/block-product/entities/block.entities';

@Injectable()
export class DebitCardListService {
  constructor(private http: HttpClient) {}

  public fetchDebitCardList(): Observable<IDebitCardListService> {
    const url = urlBuilder.services(
      environment.api.services.products.debitCards
    );
    return this.http.post<IDebitCardListService>(url, {});
  }
}
