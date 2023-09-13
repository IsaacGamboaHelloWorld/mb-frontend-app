import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { CONFIG_TEMPLATE_EDIT_POCKETS } from '@modules/pockets/pages/edit-pockets/constants/config.constant';
import { deletePocketsSuccessMapper } from '@modules/pockets/pages/edit-pockets/mappers/success.mapper';

@Component({
  selector: 'app-edit-pockets',
  templateUrl: './edit-pockets.page.html',
  styleUrls: ['./edit-pockets.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EditPocketsPage extends ConfigGlobalPageAbstractContainer {
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
    this.facade.resetEditPocket();
    this.facade.resetDeletePocket();
  }

  private _watchStatus(): void {
    this.facade.deletePocket$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((deletePocket) => {
        if (deletePocket?.completed) {
          const success: ISaveDataTemplate = {
            ...this.saveTemplate.dataTemplate,
            stepActive: PropertyTemplate.success,
            success: deletePocketsSuccessMapper.bind(this)(
              deletePocket?.response,
              this.saveTemplate.dataTemplate?.toWho
            )
          };
          this.saveTemplate.saveDataTemplate(success);
          this.configTemplate.changeStep(
            CONFIG_TEMPLATE_EDIT_POCKETS.router[1]
          );
          this.facade.resetPocketDetail();
          this.facade.fetchPockets();
        }
      });
  }
}
