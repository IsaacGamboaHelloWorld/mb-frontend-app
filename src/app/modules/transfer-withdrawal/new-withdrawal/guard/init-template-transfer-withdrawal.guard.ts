import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { TransferWithdrawalFacade } from '@modules/transfer-withdrawal/new-withdrawal/transfer-withdrawal.facade';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CONFIG_TEMPLATE_TRANSFER_WITHDRAWAL } from '@modules/transfer-withdrawal/new-withdrawal/constants/config.constant';

@Injectable()
export class InitTemplateTransferWithdrawalGuard implements CanActivate {
  constructor(
    private facade: TransferWithdrawalFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return this.facade.beforeUrl$.pipe(
      take(1),
      tap((beforeUrl) => {
        this.configTemplate.setConfig({
          ...CONFIG_TEMPLATE_TRANSFER_WITHDRAWAL,
          beforeUrl
        });
      }),
      map(() => true)
    );
  }
}
