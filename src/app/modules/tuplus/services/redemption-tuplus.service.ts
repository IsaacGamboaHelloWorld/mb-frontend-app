import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IRedeem,
  IRedeemBody
} from '@modules/tuplus/entities/redeem-tuplus.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class RedemptionTuplusService {
  constructor(private http: HttpClient) {}

  public redemption(form: IRedeemBody): Observable<IRedeem> {
    const url = urlBuilder.services(environment.api.services.tuplus.redemption);
    return this.http.post<IRedeem>(url, form);
  }
}
