import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { CONFIG_TEMPLATE_NEW_TRANSFER } from '@modules/transfer/new-transfer/constants/config.constant';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import {
  newTransferConfirmationMapper,
  newTransferServiceMapper
} from '@modules/transfer/new-transfer/mappers/confirmation.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { newTransferSuccessMapper } from '@modules/transfer/new-transfer/mappers/success.mapper';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
@Component({
  selector: 'app-transfer',
  templateUrl: './new-transfer.page.html',
  styleUrls: ['./new-transfer.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NewTransferPage extends ConfigGlobalPageAbstractContainer {
  constructor(
    private saveTemplate: SaveDataTemplateService,
    private facade: NewTransferFacade,
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
    this.facade.resetNewTransfer();
    this.facade.resetRegistered();
    this.facade.resetCost();
    this.resetActiveProduct().then();
  }

  private _watchStatus(): void {
    this.facade.newTransfer$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((newTransfer) => {
        if (newTransfer?.completed) {
          const success: ISaveDataTemplate = {
            ...this.saveTemplate.dataTemplate,
            stepActive: PropertyTemplate.success,
            success: newTransferSuccessMapper.bind(this)(
              newTransfer?.information
            )
          };
          this.saveTemplate.saveDataTemplate(success);
          this.configTemplate.changeStep(
            CONFIG_TEMPLATE_NEW_TRANSFER.router[4]
          );
        } else {
          const confirmation: ISaveDataTemplate = {
            ...this.saveTemplate.dataTemplate,
            confirmation: newTransferConfirmationMapper.bind(this)(
              this.saveTemplate.dataTemplate
            )
          };
          this.saveTemplate.saveDataTemplate(confirmation);
          this.saveTemplate.setUpdateComponent(true);
        }
      });

    this.saveTemplate.actionConfirm$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        this.facade.fetchNewTransfer(
          newTransferServiceMapper(this.saveTemplate.dataTemplate)
        );
      });
  }
}
