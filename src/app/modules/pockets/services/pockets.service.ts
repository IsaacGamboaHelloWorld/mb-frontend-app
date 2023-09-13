import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  ICreatePocketRequest,
  ICreatePocketResponse,
  IDeletePocketRequest,
  IDeletePocketResponse,
  IEditPocketRequest,
  IEditPocketResponse,
  IMovePocketRequest,
  IMovePocketResponse,
  IPocketsCategoriesResponse
} from '@modules/pockets/entities/pockets.entities';

@Injectable()
export class PocketsService {
  constructor(private http: HttpClient) {}

  public createPocket(
    data: ICreatePocketRequest
  ): Observable<ICreatePocketResponse> {
    const url = urlBuilder.services(environment.api.services.pockets.create);
    return this.http.post<ICreatePocketResponse>(url, data);
  }

  public editPocket(data: IEditPocketRequest): Observable<IEditPocketResponse> {
    const url = urlBuilder.services(environment.api.services.pockets.update);
    return this.http.post<IEditPocketResponse>(url, data);
  }

  public movePocket(data: IMovePocketRequest): Observable<IMovePocketResponse> {
    const url = urlBuilder.services(environment.api.services.pockets.move);
    return this.http.post<IMovePocketResponse>(url, data);
  }

  public deletePocket(
    data: IDeletePocketRequest
  ): Observable<IDeletePocketResponse> {
    const url = urlBuilder.services(environment.api.services.pockets.delete);
    return this.http.post<IDeletePocketResponse>(url, data);
  }

  public getCategories(): Observable<IPocketsCategoriesResponse> {
    const url = urlBuilder.services(
      environment.api.services.pockets.categories
    );
    return this.http.get<IPocketsCategoriesResponse>(url);
  }
}
