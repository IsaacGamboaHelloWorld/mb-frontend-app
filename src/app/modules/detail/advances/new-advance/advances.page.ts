import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { AdvancesFacade } from '@modules/detail/advances/new-advance/advances.facade';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { advancesConfirmationMapper } from '@modules/detail/advances/new-advance/mappers/confirmation.mapper';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { advancesSuccessMapper } from '@modules/detail/advances/new-advance/mappers/success.mapper';
import { advancesServiceMapper } from '@modules/detail/advances/new-advance/mappers/service.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { CONFIG_TEMPLATE_ADVANCES } from '@modules/detail/advances/new-advance/constants/config.constant';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.page.html',
  styleUrls: ['./advances.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancesPage extends ConfigGlobalPageAbstractContainer {
  constructor(
    private facade: AdvancesFacade,
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
    this._watchStatus();
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.facade.resetAdvance();
    this.resetActiveProduct().then();
  }

  private _watchStatus(): void {
    this.facade.advance$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((advance) => {
        if (advance?.error) {
          const confirmation: ISaveDataTemplate = {
            ...this.saveDataTemplateService.dataTemplate,
            confirmation: advancesConfirmationMapper.bind(this)(
              this.saveDataTemplateService.dataTemplate?.toWho
            )
          };
          this.saveDataTemplateService.saveDataTemplate(confirmation);
          this.saveDataTemplateService.setUpdateComponent(true);
        } else {
          const success: ISaveDataTemplate = {
            ...this.saveDataTemplateService.dataTemplate,
            success: advancesSuccessMapper.bind(this)(advance?.response),
            stepActive: PropertyTemplate.success
          };
          this.saveDataTemplateService.saveDataTemplate(success);
          this.configTemplate.changeStep(CONFIG_TEMPLATE_ADVANCES.router[2]);
        }
      });

    this.saveDataTemplateService.actionConfirm$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) =>
        this.facade.fetchAdvance(
          advancesServiceMapper(
            this.saveDataTemplateService.dataTemplate?.toWho
          )
        )
      );
  }
}
