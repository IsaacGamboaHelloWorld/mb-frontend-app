import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IRechargeService,
  IRespondRecharge
} from '@modules/recharges/new-recharge/entities/recharge.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class CellPhoneRechargeService {
  constructor(private http: HttpClient) {}

  public recharge(form: IRechargeService): Observable<IRespondRecharge> {
    const url = urlBuilder.services(
      environment.api.services.recharges.recharge
    );

    return this.http.post<IRespondRecharge>(url, form);
  }
}
