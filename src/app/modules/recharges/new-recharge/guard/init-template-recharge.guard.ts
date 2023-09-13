import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { RechargesFacade } from '@modules/recharges/new-recharge/recharges.facade';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CONFIG_TEMPLATE_RECHARGE } from '@modules/recharges/new-recharge/constants/config.constant';

@Injectable()
export class InitTemplateRechargeGuard implements CanActivate {
  constructor(
    private facade: RechargesFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return this.facade.beforeUrl$.pipe(
      take(1),
      tap((beforeUrl) => {
        this.configTemplate.setConfig({
          ...CONFIG_TEMPLATE_RECHARGE,
          beforeUrl
        });
      }),
      map(() => true)
    );
  }
}
