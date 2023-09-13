import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { QrFacade } from '@modules/qr/new-payment/qr.facade';
import { CONFIG_TEMPLATE_PAYMENT_QR } from '@modules/qr/new-payment/constants/config-qr.constant';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { QR_ANNULMENT } from '@commons/constants/navigatie-global';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { qrAnnulmentConfirmationMapper } from '@modules/qr/new-payment/mappers/confirmation-qr-annulment.mapper';
import { configDefaultQr } from '@modules/qr/new-payment/helpers/config-default.helper';

@Injectable()
export class InitTemplateQrGuard implements CanActivate {
  constructor(
    private facade: QrFacade,
    private configTemplate: ConfigTemplateService,
    private saveDataTemplateService: SaveDataTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.facade.routerUrl$, this.facade.beforeUrl$]).pipe(
      take(1),
      tap(([url, beforeUrl]) => {
        this.configTemplate.setConfig(
          configDefaultQr(
            {
              ...CONFIG_TEMPLATE_PAYMENT_QR,
              defaultUrl: url,
              beforeUrl
            },
            url
          )
        );
        if (url === QR_ANNULMENT) {
          this.saveDataTemplateService.saveDataTemplate({
            ...this.saveDataTemplateService.dataTemplate,
            stepActive: PropertyTemplate.confirmation,
            confirmation: qrAnnulmentConfirmationMapper.bind(this)(
              this.saveDataTemplateService.dataTemplate
            )
          });
          this.configTemplate.changeStep(this.configTemplate.config.router[1]);
        }
      }),
      map(() => true)
    );
  }
}
