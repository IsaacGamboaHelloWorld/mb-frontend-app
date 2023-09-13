import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { addPaymentComponents } from '@modules/payments/new-payment/helpers/add-payments-components.helper';
import { CONFIG_TEMPLATE_NEW_PAYMENT } from '@modules/payments/new-payment/constants/config.constant';
import { PaymentsFacade } from '@modules/payments/payments.facade';

@Injectable()
export class InitTemplatePaymentGuard implements CanActivate {
  constructor(
    private facade: PaymentsFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.facade.routerUrl$, this.facade.beforeUrl$]).pipe(
      take(1),
      tap(([url, beforeUrl]) => {
        this.configTemplate.setConfig(
          addPaymentComponents(
            {
              ...CONFIG_TEMPLATE_NEW_PAYMENT,
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
