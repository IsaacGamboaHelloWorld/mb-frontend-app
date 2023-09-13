import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITuplus } from '@modules/main-container/entities/tuplus.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { BANKS } from '@commons/constants/banks';

@Injectable()
export class TuplusService {
  constructor(private http: HttpClient) {}

  public loadTuplus(): Observable<ITuplus> {
    const url = urlBuilder.services(environment.api.services.tuplus.balance);
    return this.http.post<ITuplus>(url, {
      companyId: BANKS.BANCO_POPULAR
    });
  }
}
