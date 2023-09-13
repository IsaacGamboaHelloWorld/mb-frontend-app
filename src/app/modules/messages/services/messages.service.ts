import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IBodyDeleteMessage,
  IBodyReadMessage,
  IGeneralMessageService,
  IMessagesResponse,
  IMessagesService
} from '@modules/messages/entities/messages.entities';

@Injectable()
export class MessagesService {
  constructor(private http: HttpClient) {}

  public listMessages(body: IMessagesService): Observable<IMessagesResponse> {
    const url = urlBuilder.services(
      environment.api.services.notifications.messages
    );
    return this.http.post<IMessagesResponse>(url, body);
  }

  public deleteMessages(
    body: IBodyDeleteMessage
  ): Observable<IGeneralMessageService> {
    const url = urlBuilder.services(
      environment.api.services.notifications.delete
    );
    return this.http.post<IGeneralMessageService>(url, body);
  }

  public readMessages(
    body: IBodyReadMessage
  ): Observable<IGeneralMessageService> {
    const url = urlBuilder.services(
      environment.api.services.notifications.check
    );
    return this.http.post<IGeneralMessageService>(url, body);
  }
}
