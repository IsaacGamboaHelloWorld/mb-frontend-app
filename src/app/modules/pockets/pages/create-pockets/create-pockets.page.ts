import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { createPocketsSuccessMapper } from '@modules/pockets/pages/create-pockets/mappers/success.mapper';
import { CONFIG_TEMPLATE_CREATE_POCKETS } from '@modules/pockets/pages/create-pockets/constants/config.constant';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

@Component({
  selector: 'app-create-pockets',
  templateUrl: './create-pockets.page.html',
  styleUrls: ['./create-pockets.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePocketsPage extends ConfigGlobalPageAbstractContainer {
  constructor(
    private saveTemplate: SaveDataTemplateService,
    private facade: PocketsFacade,
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
    this.facade.getCategories();
    this._watchStatus();
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.facade.resetCreatePocket();
  }

  private _watchStatus(): void {
    this.facade.createPocket$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((createPockets) => {
        if (createPockets?.completed) {
          const success: ISaveDataTemplate = {
            ...this.saveTemplate.dataTemplate,
            stepActive: PropertyTemplate.success,
            success: createPocketsSuccessMapper.bind(this)(
              createPockets?.response
            )
          };
          this.saveTemplate.saveDataTemplate(success);
          this.configTemplate.changeStep(
            CONFIG_TEMPLATE_CREATE_POCKETS.router[3]
          );
          this.facade.fetchPockets();
        }
      });
  }
}
