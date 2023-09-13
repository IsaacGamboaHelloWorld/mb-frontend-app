import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IBlockProductBody,
  IBlockProductService
} from '@modules/block-product/entities/block.entities';

@Injectable()
export class BlockProductService {
  constructor(private http: HttpClient) {}

  public fetchBlockProduct(
    body: IBlockProductBody
  ): Observable<IBlockProductService> {
    const url = urlBuilder.services(environment.api.services.products.block);
    return this.http.post<IBlockProductService>(url, body);
  }
}
