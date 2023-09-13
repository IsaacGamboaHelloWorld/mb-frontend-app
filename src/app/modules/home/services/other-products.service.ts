import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IOtherProductsBodyService,
  IRespOtherProducts
} from '@modules/home/entities/otherProducts.entities';

@Injectable()
export class OtherProductsService {
  constructor(private http: HttpClient) {}

  public otherProducts(
    body: IOtherProductsBodyService
  ): Observable<IRespOtherProducts> {
    const url = urlBuilder.services(
      environment.api.services.products.otherProducts
    );

    return this.http.post<IRespOtherProducts>(url, body);
  }
}
