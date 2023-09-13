import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EncryptionInterceptor } from './interceptor/encryption.interceptor';
import { SecurityService } from './services/security.service';
import { Security } from './utils/security';
import { ContentFullConfigService } from '@commons/security/services/contentFull-config.service';
import { IUrlExcluded } from '../constants/urls_excluded';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SecurityService,
    Security,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptionInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule {
  static forRoot(
    urls_excluded: IUrlExcluded[] = []
  ): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        {
          provide: ContentFullConfigService,
          useValue: urls_excluded
        }
      ]
    };
  }
}
