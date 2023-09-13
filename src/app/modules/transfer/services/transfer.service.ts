import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  INewTransferRespond,
  INewTransferService
} from '@modules/transfer/entities/transfer.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IConsTransferResp,
  ICostTransferService
} from '@modules/transfer/entities/cost-transfer.entities';

@Injectable()
export class NewTransferService {
  constructor(private http: HttpClient) {}

  public newTransfer(
    transfer: INewTransferService
  ): Observable<INewTransferRespond> {
    const url = urlBuilder.services(environment.api.services.transfer.new);
    return this.http.post<INewTransferRespond>(url, transfer);
  }

  public newTransferNotRegistered(
    transfer: INewTransferService
  ): Observable<INewTransferRespond> {
    const url = urlBuilder.services(
      environment.api.services.transfer.newNotRegistered
    );
    return this.http.post<INewTransferRespond>(url, transfer);
  }

  public costTransfer(
    body: ICostTransferService
  ): Observable<IConsTransferResp> {
    const url = urlBuilder.services(environment.api.services.transfer.cost);
    return this.http.post<IConsTransferResp>(url, body);
  }
}
