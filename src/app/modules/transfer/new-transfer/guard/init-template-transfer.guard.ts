import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { addTransferComponents } from '@modules/transfer/helpers/add-transfer-components.helper';
import { CONFIG_TEMPLATE_NEW_TRANSFER } from '@modules/transfer/new-transfer/constants/config.constant';

@Injectable()
export class InitTemplateTransferGuard implements CanActivate {
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
              ...CONFIG_TEMPLATE_NEW_TRANSFER,
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
