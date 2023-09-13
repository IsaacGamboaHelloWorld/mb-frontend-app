import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { filter, takeUntil } from 'rxjs/operators';

import { CONFIG_TEMPLATE_NEW_TRANSFER_NOT_REGISTERED } from '@modules/transfer/transfer-not-registered/constants/config.constant';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { newTransferSuccessNotRegisteredMapper } from '@modules/transfer/transfer-not-registered/mappers/success-not-registered.mapper';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import {
  newTransferConfirmationNotRegisteredMapper,
  newTransferNotRegisteredServiceMapper
} from '@modules/transfer/transfer-not-registered/mappers/confirmation-not-registered.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
@Component({
  selector: 'app-transfer-not-registered',
  templateUrl: './transfer-not-registered.page.html',
  styleUrls: ['./transfer-not-registered.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TransferNotRegisteredPage extends ConfigGlobalPageAbstractContainer {
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
            success: newTransferSuccessNotRegisteredMapper.bind(this)(
              newTransfer?.information
            )
          };
          this.saveTemplate.saveDataTemplate(success);
          this.configTemplate.changeStep(
            CONFIG_TEMPLATE_NEW_TRANSFER_NOT_REGISTERED.router[2]
          );
        } else {
          const confirmation: ISaveDataTemplate = {
            ...this.saveTemplate.dataTemplate,
            confirmation: newTransferConfirmationNotRegisteredMapper.bind(this)(
              this.saveTemplate.dataTemplate,
              true
            )
          };
          this.saveTemplate.saveDataTemplate(confirmation);
          this.saveTemplate.setUpdateComponent(true);
        }
      });

    this.saveTemplate.actionConfirm$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        this.facade.fetchNewTransferNotRegistered(
          newTransferNotRegisteredServiceMapper(this.saveTemplate.dataTemplate)
        );
      });
  }
}
