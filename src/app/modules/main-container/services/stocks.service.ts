import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IStocksAllParams,
  IStocksAvalAll,
  IStocksPeriod,
  IStocksType
} from '@modules/main-container/entities/stocks.interface';

@Injectable()
export class StocksService {
  constructor(private http: HttpClient) {}

  public allStocks(body: IStocksAllParams): Observable<IStocksAvalAll> {
    const url = urlBuilder.services(environment.api.services.stocks.all);
    return this.http.post<IStocksAvalAll>(url, body);
  }

  public typeStocks(): Observable<IStocksType> {
    const url = urlBuilder.services(environment.api.services.stocks.types);
    return this.http.post<IStocksType>(url, {});
  }

  public periodStocks(): Observable<IStocksPeriod> {
    const url = urlBuilder.services(environment.api.services.stocks.period);
    return this.http.get<IStocksPeriod>(url);
  }
}
