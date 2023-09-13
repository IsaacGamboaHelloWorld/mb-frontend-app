import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { IDataUser } from '@modules/main-container/entities/user.entities';

@Injectable()
export class DataUserService {
  constructor(private http: HttpClient) {}

  public userData(): Observable<IDataUser> {
    const url = urlBuilder.services(environment.api.services.customer.user);
    return this.http.post<IDataUser>(url, {});
  }
}
