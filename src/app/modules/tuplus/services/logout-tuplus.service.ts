import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { urlBuilder } from '@commons/utils/url-builder';
import { ILogoutTuplus } from '@modules/tuplus/entities/logout-tuplus.entities';

@Injectable()
export class LogoutTuplusService {
  constructor(private http: HttpClient) {}

  public logoutTuplus(): Observable<ILogoutTuplus> {
    const LOGOUT_BODY = {
      companyId: 'BANCO_POPULAR'
    };
    const url = urlBuilder.services(
      environment.api.services.tuplus.logoutTuplus
    );
    return this.http.post<ILogoutTuplus>(url, LOGOUT_BODY);
  }
}
