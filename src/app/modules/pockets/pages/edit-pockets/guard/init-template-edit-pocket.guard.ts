import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { CONFIG_TEMPLATE_EDIT_POCKETS } from '@modules/pockets/pages/edit-pockets/constants/config.constant';

@Injectable()
export class InitTemplateEditPocketsGuard implements CanActivate {
  constructor(
    private facade: PocketsFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.facade.routerUrl$, this.facade.beforeUrl$]).pipe(
      take(1),
      tap(([url, beforeUrl]) => {
        this.configTemplate.setConfig({
          ...CONFIG_TEMPLATE_EDIT_POCKETS,
          defaultUrl: url,
          beforeUrl
        });
      }),
      map(() => true)
    );
  }
}
