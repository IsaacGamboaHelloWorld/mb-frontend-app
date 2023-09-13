import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { addPaymentOneStepComponents } from '@modules/payments/new-payment-one-step/helpers/render-payments-components.helper';
import { CONFIG_TEMPLATE_NEW_PAYMENT_ONE_STEP } from '@modules/payments/new-payment-one-step/constants/config.constant';
import { PaymentsFacade } from '@modules/payments/payments.facade';

@Injectable()
export class InitTemplatePaymentOneStepGuard implements CanActivate {
  constructor(
    private facade: PaymentsFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.facade.routerUrl$, this.facade.beforeUrl$]).pipe(
      take(1),
      tap(([url, beforeUrl]) => {
        this.configTemplate.setConfig(
          addPaymentOneStepComponents(
            {
              ...CONFIG_TEMPLATE_NEW_PAYMENT_ONE_STEP,
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
