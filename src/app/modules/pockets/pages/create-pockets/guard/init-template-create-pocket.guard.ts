import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CONFIG_TEMPLATE_CREATE_POCKETS } from '@modules/pockets/pages/create-pockets/constants/config.constant';
import { PocketsFacade } from '@modules/pockets/pockets.facade';

@Injectable()
export class InitTemplateCreatePocketGuard implements CanActivate {
  constructor(
    private facade: PocketsFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.facade.routerUrl$, this.facade.beforeUrl$]).pipe(
      take(1),
      tap(([url, beforeUrl]) => {
        this.configTemplate.setConfig({
          ...CONFIG_TEMPLATE_CREATE_POCKETS,
          defaultUrl: url,
          beforeUrl
        });
      }),
      map(() => true)
    );
  }
}
