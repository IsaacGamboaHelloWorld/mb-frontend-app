import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IRespondOperators } from '@modules/recharges/new-recharge/entities/operatators.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class OperatorsNameService {
  constructor(private http: HttpClient) {}

  public operators(): Observable<IRespondOperators> {
    const url = urlBuilder.services(
      environment.api.services.recharges.operators
    );
    return this.http.get<IRespondOperators>(url);
  }
}
