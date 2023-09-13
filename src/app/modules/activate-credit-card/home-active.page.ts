import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { HomeActiveFacade } from '@modules/activate-credit-card/home-active.facade';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { CONFIG_TEMPLATE_ACTIVE_PRODUCT } from '@modules/activate-credit-card/constants/config.constant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { activeCreditCardSuccessMapper } from '@modules/activate-credit-card/mappers/actiive-card-success.mapper';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';

@Component({
  selector: 'app-home-active-block',
  templateUrl: './home-active.page.html',
  styleUrls: ['./home-active.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeActivePage extends ConfigGlobalPageAbstractContainer {
  constructor(
    private facade: HomeActiveFacade,
    private currencyFormat: CurrencyFormatPipe,
    protected injector: Injector,
    private saveTemplate: SaveDataTemplateService
  ) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this.configTemplate.setConfig({
      ...this.configTemplate.config,
      ionContent: this.ionContent
    });
    this._watchActions();
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.facade.resetActiveCreditCard();
  }

  private _watchActions(): void {
    this.facade.activeCreditCard$
      .pipe(
        takeUntil(this._destroy$),
        filter((info) => info.completed)
      )
      .subscribe((data) => {
        const success: ISaveDataTemplate = {
          ...this.saveTemplate.dataTemplate,
          stepActive: PropertyTemplate.success,
          success: activeCreditCardSuccessMapper.bind(this)(data.information)
        };
        this.saveTemplate.saveDataTemplate(success);
        this.configTemplate.changeStep(
          CONFIG_TEMPLATE_ACTIVE_PRODUCT.router[1]
        );
      });
    this.saveTemplate.updateActionButtons$
      .pipe(
        takeUntil(this._destroy$),
        filter(
          (data) =>
            data === STATUS_BUTTONS.primary || data === STATUS_BUTTONS.secondary
        )
      )
      .subscribe((data) => {
        this.configTemplate.changeStep(
          CONFIG_TEMPLATE_ACTIVE_PRODUCT.router[0]
        );
      });
  }
}
