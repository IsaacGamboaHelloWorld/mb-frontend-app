import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IBodySendMessage,
  IChangePasswordResponse,
  IChangePasswordService,
  ISendMessageService
} from '@modules/change-password/entities/change-password.entities';

export type PublicKey = Readonly<{
  publicKey: string;
}>;

@Injectable()
export class ChangePasswordService {
  private _serverPublicKey: PublicKey;

  constructor(private http: HttpClient) {}

  get serverPublicKey(): PublicKey {
    return this._serverPublicKey;
  }

  public changePassword(
    form: IChangePasswordService
  ): Observable<IChangePasswordResponse> {
    const url = urlBuilder.services(
      environment.api.services.auth.changePassword
    );
    return this.http.post<IChangePasswordResponse>(url, form);
  }

  public getAuthServerPublicKey$(): Observable<PublicKey> {
    if (!!this._serverPublicKey) {
      return of(this.serverPublicKey);
    } else {
      return this.http
        .get<PublicKey>(
          urlBuilder.services(
            environment.api.services.auth.getEnrollmentServerPublicKey
          )
        )
        .pipe(tap((key) => (this._serverPublicKey = key)));
    }
  }

  public sendMessage(body: IBodySendMessage): Observable<ISendMessageService> {
    const url = urlBuilder.services(
      environment.api.services.notifications.send
    );
    return this.http.post<ISendMessageService>(url, body);
  }
}
