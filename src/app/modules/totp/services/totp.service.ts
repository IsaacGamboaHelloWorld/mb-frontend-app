import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { ITotpService } from '@modules/totp/entities/totp.entitie';

@Injectable()
export class TotpService {
  constructor(private http: HttpClient) {}

  public fetchTotp(): Observable<ITotpService> {
    const url = urlBuilder.services(environment.api.services.totp);
    return this.http.post<ITotpService>(url, {});
  }
}
