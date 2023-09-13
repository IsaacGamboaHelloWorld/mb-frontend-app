import { Injectable } from '@angular/core';
import { datadogRum } from '@datadog/browser-rum';

import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { AppFacade } from '@app/app.facade';
import { SecurityService } from '@commons/security/services/security.service';
import { AdlFingerPrintService } from '@commons/services/adl-finger-print.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  constructor(
    private facade: AppFacade,
    private auth: AuthSessionService,
    private security: SecurityService,
    private fingerPrintService: AdlFingerPrintService,
    private securityStorageService: AdlSecureStorageService
  ) {}

  public checkInitToken(): void {
    this.security.initializeSecurityKeys$().toPromise();
    this.isAuth().then((data) => this.facade.setIsLogged(data));
  }

  public async fingerPrint(key: string): Promise<string> {
    try {
      return await this.fingerPrintService.fingerPrint(key);
    } catch {}
  }

  public initEvents(): void {
    environment.dataDog.enable &&
      datadogRum.init({
        applicationId: environment.dataDog.appId,
        clientToken: environment.dataDog.clientToken,
        site: 'datadoghq.com',
        service: environment.dataDog.name,
        sampleRate: 100,
        trackInteractions: true
      });
  }

  private async isAuth(): Promise<boolean> {
    return this.auth.hasTokenData();
  }
}
