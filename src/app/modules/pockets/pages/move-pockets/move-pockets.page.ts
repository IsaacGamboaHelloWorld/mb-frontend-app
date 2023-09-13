import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { filter, takeUntil } from 'rxjs/operators';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { createPocketsSuccessMapper } from '@modules/pockets/pages/create-pockets/mappers/success.mapper';
import { CONFIG_TEMPLATE_MOVE_POCKETS } from '@modules/pockets/pages/move-pockets/constants/config.constant';
import { movePocketsSuccessMapper } from '@modules/pockets/pages/move-pockets/mappers/success.mapper';

@Component({
  selector: 'app-move-pockets',
  templateUrl: './move-pockets.page.html',
  styleUrls: ['./move-pockets.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MovePocketsPage extends ConfigGlobalPageAbstractContainer {
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
    this._watchStatus();
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.facade.resetMovePocket();
  }

  private _watchStatus(): void {
    this.facade.movePocket$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((movePockets) => {
        if (movePockets?.completed) {
          const success: ISaveDataTemplate = {
            ...this.saveTemplate.dataTemplate,
            stepActive: PropertyTemplate.success,
            success: movePocketsSuccessMapper.bind(this)(
              movePockets?.response,
              this.saveTemplate.dataTemplate?.toWho
            )
          };
          this.saveTemplate.saveDataTemplate(success);
          this.configTemplate.changeStep(
            CONFIG_TEMPLATE_MOVE_POCKETS.router[1]
          );
          this.facade.fetchPockets();
        }
      });
  }
}
