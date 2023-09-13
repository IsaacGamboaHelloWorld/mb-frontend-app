import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class ValidatePingService {
  constructor(private http: HttpClient) {}

  public validatePing(): Observable<any> {
    const url = urlBuilder.services(environment.api.services.auth.ping);

    return this.http.get(url);
  }
}
