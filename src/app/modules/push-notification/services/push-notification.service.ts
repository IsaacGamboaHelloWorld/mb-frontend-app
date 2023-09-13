import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IRegisterPushBody,
  IRegisterPushService
} from '@modules/push-notification/entities/push-notification.entities';

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public fetchRegister(
    body: IRegisterPushBody
  ): Observable<IRegisterPushService> {
    const url = urlBuilder.services(
      environment.api.services.notifications.register
    );
    return this.http.post<IRegisterPushService>(url, body);
  }

  public fetchDelete(): Observable<IRegisterPushService> {
    const url = urlBuilder.services(
      environment.api.services.notifications.disabled
    );
    return this.http.post<IRegisterPushService>(url, {});
  }
}
