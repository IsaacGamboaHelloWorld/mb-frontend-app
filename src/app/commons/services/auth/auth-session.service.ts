import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';

import { KEYS } from '@commons/constants/global';
import { SecurityService } from '@commons/security/services/security.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {
  constructor(
    private security: SecurityService,
    private secureStorageService: AdlSecureStorageService
  ) {}

  public async hasTokenData(): Promise<boolean> {
    return !!(await this.secureStorageService.get(KEYS.AUTH_TOKEN));
  }

  public async getToken(): Promise<string> {
    return (await this.secureStorageService.get(KEYS.AUTH_TOKEN)) || '';
  }

  public async saveTokenData(token: string): Promise<void> {
    await this.secureStorageService.put(
      KEYS.AUTH_TOKEN,
      token.toString(),
      Capacitor.platform === 'web'
    );
  }

  public async clearData(): Promise<void> {
    this.security.deleteKey();
  }
}
