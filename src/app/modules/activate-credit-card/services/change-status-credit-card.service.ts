import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IActiveCreditCardBody,
  IActiveCreditCardService
} from '@modules/activate-credit-card/entities/active-block-credit-card.entities';

@Injectable()
export class ChangeStatusCreditCardService {
  constructor(private http: HttpClient) {}

  public fetchActiveCreditCard(
    body: IActiveCreditCardBody
  ): Observable<IActiveCreditCardService> {
    const url = urlBuilder.services(environment.api.services.creditCard.active);
    return this.http.post<IActiveCreditCardService>(url, body);
  }
}
