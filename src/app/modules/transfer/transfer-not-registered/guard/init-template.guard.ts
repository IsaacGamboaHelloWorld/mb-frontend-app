import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { addTransferComponents } from '@modules/transfer/helpers/add-transfer-components.helper';
import { CONFIG_TEMPLATE_NEW_TRANSFER_NOT_REGISTERED } from '@modules/transfer/transfer-not-registered/constants/config.constant';
@Injectable({
  providedIn: 'root'
})
export class InitTemplateGuard implements CanActivate {
  constructor(
    private facade: NewTransferFacade,
    private configTemplate: ConfigTemplateService
  ) {}
  canActivate(): Observable<boolean> {
    return combineLatest([this.facade.routerUrl$, this.facade.beforeUrl$]).pipe(
      take(1),
      tap(([url, beforeUrl]) => {
        this.configTemplate.setConfig(
          addTransferComponents(
            {
              ...CONFIG_TEMPLATE_NEW_TRANSFER_NOT_REGISTERED,
              defaultUrl: url,
              beforeUrl
            },
            url
          )
        );
      }),
      map(() => true)
    );
  }
}
