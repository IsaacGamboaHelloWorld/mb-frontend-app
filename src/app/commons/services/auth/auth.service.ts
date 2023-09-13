import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import {
  IEnrollmentResponse,
  InitAuth,
  IStartAuth
} from '@modules/auth/entities/auth.interface';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';

export type PublicKey = Readonly<{
  publicKey: string;
}>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _serverPublicKey: PublicKey;
  private _temporalData: string;
  private _temporalFingerprint: boolean;
  private _infoUser: InitAuth;

  constructor(
    private http: HttpClient,
    private authSession: AuthSessionService
  ) {}

  set setData(value: string) {
    this._temporalData = value;
  }

  set setInfoUser(info: InitAuth) {
    this._infoUser = info;
  }

  set temporalFingerprint(state: boolean) {
    this._temporalFingerprint = state;
  }

  get temporalFingerprint(): boolean {
    return this._temporalFingerprint;
  }

  get serverPublicKey(): PublicKey {
    return this._serverPublicKey;
  }

  get temporalData(): string {
    return this._temporalData;
  }

  get infoUser(): InitAuth {
    return this._infoUser;
  }

  public login(authData: IStartAuth): Observable<IEnrollmentResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-SECURITY-RECAPTCHA': environment.recaptcha
      })
    };

    const url = urlBuilder.services(environment.api.services.auth.enrollment);
    return this.http.post<IEnrollmentResponse>(
      url,
      { ...authData, flowName: 'GB_MB' },
      httpOptions
    );
  }

  public logOut(): Observable<boolean> {
    this._infoUser = null;
    const url = urlBuilder.services(environment.api.services.auth.logout);
    return this.http.delete(url).pipe(map((data) => true));
  }

  public getServerPublicKey(): Observable<PublicKey> {
    if (!!this.serverPublicKey) {
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
}
