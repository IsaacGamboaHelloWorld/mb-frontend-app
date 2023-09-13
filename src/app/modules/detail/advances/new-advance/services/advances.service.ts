import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IAdvanceResponse,
  IAdvanceService
} from '@modules/detail/advances/new-advance/entities/advances.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class AdvancesService {
  constructor(private http: HttpClient) {}

  public executeAdvance(form: IAdvanceService): Observable<IAdvanceResponse> {
    const url = urlBuilder.services(environment.api.services.products.advances);
    return this.http.post<IAdvanceResponse>(url, form);
  }
}
