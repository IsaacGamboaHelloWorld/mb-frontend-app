import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { KEYS_SECURITY } from '../constants/auth';
import { GetPublicKeyResponse } from '../models/getPublicKeyResponse.interface';
import { GetSymmetricKeyRequest } from '../models/getSymmetricKeyRequest.interface';
import { Symmetric } from '../models/symmetric.interface';
import { Security } from '../utils/security';
import * as utilsSecurity from '../utils/security.utils';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private _key: CryptoKeyPair;
  private _symmetric: Symmetric;
  private _keySymmetric: CryptoKey;
  private _timeSymmetric: number = 7200;
  private _serverPublicKey: string;
  private _interval: number = 3600000;

  constructor(
    private security: Security,
    private http: HttpClient,
    private secureStorageService: AdlSecureStorageService
  ) {}

  get symmetric(): Symmetric {
    return this._symmetric;
  }

  get hasKeys(): boolean {
    return !!this._symmetric && !!this._keySymmetric;
  }

  get timeSymmetric(): number {
    return this._timeSymmetric;
  }

  public resetKeys(): void {
    this._symmetric = this._keySymmetric = null;
  }

  public async setSymmetric(): Promise<string> {
    const key = await this.secureStorageService.get(KEYS_SECURITY.SECURITY);
    if (!isNullOrUndefined(key)) {
      this._symmetric = JSON.parse(atob(key));
      this._keySymmetric = await this.security.importAesGcmKey(
        this._symmetric.key
      );
    }
    return key;
  }

  public encryptAesGcm(data: string = ''): PromiseLike<string> {
    if (this.hasKeys) {
      return this.security.encryptAesGcm(
        data,
        this._symmetric.iv,
        this._keySymmetric
      );
    } else {
      return Promise.reject();
    }
  }

  public decryptAesGcm(data: string = ''): PromiseLike<string> {
    if (this.hasKeys) {
      return this.security.decryptAesGcm(
        data,
        this._symmetric.iv,
        this._keySymmetric
      );
    } else {
      return Promise.reject();
    }
  }

  public deleteKey(): Observable<boolean> {
    return this.http
      .get(
        environment.api.base +
          environment.api.services.security.close_security_session
      )
      .pipe(
        tap(() => {
          this._symmetric = this._keySymmetric = null;
        }),
        map((data) => true)
      );
  }

  public async getSymmetricKey(): Promise<boolean> {
    const key = await this.setSymmetric();
    const expire = await this.secureStorageService.get(
      KEYS_SECURITY.EXPIRY_TIME
    );
    if (
      !this.hasKeys ||
      (!!expire ? +atob(expire) : 0) + this._interval < Date.now() ||
      isNullOrUndefined(key)
    ) {
      try {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        const data = await this._buildRequestBody();
        const url =
          environment.api.base + environment.api.services.symmetric_key;
        const response = await this.http
          .post<Symmetric>(url, data, httpOptions)
          .toPromise();
        await this._processResponse(response);
      } catch (e) {}
    }
    return this.hasKeys;
  }

  public async getCipherPublicKey(): Promise<void> {
    if (!this._serverPublicKey) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const url =
        environment.api.base +
        environment.api.services.security.cipher_public_key;
      const response = await this.http
        .get<GetPublicKeyResponse>(url, httpOptions)
        .toPromise();
      this._serverPublicKey = response.publicKey;
    }
  }

  public hmac(input: string): string {
    return utilsSecurity.hmac(input, this._symmetric.hmacKey);
  }

  public initializeSecurityKeys$(): Observable<boolean> {
    return from(this.getSymmetricKey());
  }

  private async _buildRequestBody(): Promise<GetSymmetricKeyRequest> {
    await this.getCipherPublicKey();
    this._key = await this.security.generateRsaPkcs1KeyPair();
    const publicKey = await this.security.exportPublicKey(this._key.publicKey);
    const hash = utilsSecurity.sha(publicKey);
    const hashSlice =
      hash.substring(0, 6) + hash.substring(hash.length - 6, hash.length);
    const trustOne = this.security.encryptRsaPkcs1String(
      hashSlice,
      this._serverPublicKey
    ) as string;
    const trustTwo = await this.security.signRsaPkcs1(
      trustOne,
      this._key.privateKey
    );
    const timestamp = this.security.encryptRsaPkcs1String(
      Date.now().toString(),
      this._serverPublicKey
    ) as string;
    return {
      publicKey,
      timestamp,
      trust1: trustOne,
      trust2: trustTwo
    };
  }

  private async _processResponse(response: Symmetric): Promise<void> {
    const privateKey = await this.security.exportPrivateKey(
      this._key.privateKey
    );
    this._symmetric = {
      id: response.id,
      iv: this.security.decryptRsaPkcs1String(
        response.iv,
        privateKey
      ) as string,
      key: this.security.decryptRsaPkcs1String(
        response.key,
        privateKey
      ) as string,
      hmacKey: this.security.decryptRsaPkcs1String(
        response.hmacKey,
        privateKey
      ) as string
    };
    this._timeSymmetric = response.expiration;
    this._interval = (response.expiration * 1000) / 2;
    this._keySymmetric = await this.security.importAesGcmKey(
      this._symmetric.key
    );
    await this.secureStorageService.put(
      KEYS_SECURITY.SECURITY,
      btoa(JSON.stringify(this._symmetric)),
      Capacitor.platform === 'web'
    );
    await this.secureStorageService.put(
      KEYS_SECURITY.EXPIRY_TIME,
      btoa(JSON.stringify(Date.now())),
      Capacitor.platform === 'web'
    );
  }
}
