import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { RechargesFacade } from '@modules/recharges/new-recharge/recharges.facade';
import {
  rechargeConfirmationMapper,
  rechargeServiceMapper
} from '@modules/recharges/new-recharge/mappers/confirmation.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { rechargeSuccessMapper } from '@modules/recharges/new-recharge/mappers/success.mapper';
import { CONFIG_TEMPLATE_RECHARGE } from '@modules/recharges/new-recharge/constants/config.constant';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';

@Component({
  selector: 'app-recharges',
  templateUrl: './recharges.page.html',
  styleUrls: ['./recharges.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RechargesPage extends ConfigGlobalPageAbstractContainer {
  constructor(
    private facade: RechargesFacade,
    private saveDataTemplateService: SaveDataTemplateService,
    private currencyFormat: CurrencyFormatPipe,
    protected injector: Injector
  ) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this.configTemplate.setConfig({
      ...this.configTemplate.config,
      ionContent: this.ionContent
    });
    this.facade.fetchOperators();
    this._watchStatus();
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.facade.resetRecharge();
    this.resetActiveProduct();
  }

  private _watchStatus(): void {
    this.facade.recharge$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((recharge) => {
        if (recharge?.error) {
          const confirmation: ISaveDataTemplate = {
            ...this.saveDataTemplateService.dataTemplate,
            confirmation: rechargeConfirmationMapper.bind(this)(
              this.saveDataTemplateService.dataTemplate?.toWho
            )
          };
          this.saveDataTemplateService.saveDataTemplate(confirmation);
          this.saveDataTemplateService.setUpdateComponent(true);
        } else if (recharge?.completed) {
          const success: ISaveDataTemplate = {
            ...this.saveDataTemplateService.dataTemplate,
            success: rechargeSuccessMapper.bind(this)(recharge?.form),
            stepActive: PropertyTemplate.success
          };
          this.saveDataTemplateService.saveDataTemplate(success);
          this.configTemplate.changeStep(CONFIG_TEMPLATE_RECHARGE?.router[2]);
        }
      });

    this.saveDataTemplateService.actionConfirm$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) =>
        this.facade.fetchRecharge(
          rechargeServiceMapper(
            this.saveDataTemplateService.dataTemplate?.toWho
          )
        )
      );
  }
}
