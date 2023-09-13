import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IPFData,
  IServicePeriod,
  IServiceStatementFile,
  IStatement
} from '@modules/documents/statements/entities/statements.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class StatementsService {
  constructor(private http: HttpClient) {}

  public fetchPeriods(body: IServicePeriod): Observable<IStatement> {
    const url = urlBuilder.services(
      environment.api.services.products.statements
    );

    return this.http.post<IStatement>(url, body);
  }

  public fetchStatementFile(body: IServiceStatementFile): Observable<IPFData> {
    const url = urlBuilder.services(
      environment.api.services.products.statementsFile
    );

    return this.http.post<IPFData>(url, body);
  }
}
