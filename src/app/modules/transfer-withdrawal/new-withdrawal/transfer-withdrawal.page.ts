import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { TransferWithdrawalFacade } from '@modules/transfer-withdrawal/new-withdrawal/transfer-withdrawal.facade';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { CONFIG_TEMPLATE_TRANSFER_WITHDRAWAL } from '@modules/transfer-withdrawal/new-withdrawal/constants/config.constant';
import {
  transferWithdrawalConfirmationMapper,
  transferWithdrawalServiceMapper
} from '@modules/transfer-withdrawal/new-withdrawal/mappers/transfer-withdrawal.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { transferWithdrawalSuccessMapper } from '@modules/transfer-withdrawal/new-withdrawal/mappers/transfer-success-withdrawal.mapper';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { KEYS } from '@commons/constants/global';
import { ModalInfoComponent } from '@modules/transfer-withdrawal/new-withdrawal/components/modal-info/modal-info.component';

@Component({
  selector: 'app-transfer-withdrawal',
  templateUrl: './transfer-withdrawal.page.html',
  styleUrls: ['./transfer-withdrawal.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TransferWithdrawalPage extends ConfigGlobalPageAbstractContainer {
  private _subs: Subscription[] = [];
  constructor(
    private facade: TransferWithdrawalFacade,
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
    this._validateKey().then();
  }

  ionViewDidLeave(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
    this.facade.resetTransferWithdrawal();
    this.resetActiveProduct().then();
  }

  private async _validateKey(): Promise<void> {
    try {
      const key = await this.securityStorageService.get(
        KEYS.MODAL_TRANSFER_WITHDRAWAL
      );
      !key && this.modalService.openModal(ModalInfoComponent, {}).then();
    } catch {}
  }

  private _watchStatus(): void {
    this._subs.push(
      this.facade.transferWithdrawal$
        .pipe(filter((data) => data.completed || data.error))
        .subscribe((data) => {
          if (data.error) {
            const confirmation: ISaveDataTemplate = {
              ...this.saveDataTemplateService.dataTemplate,
              confirmation: transferWithdrawalConfirmationMapper.bind(this)(
                this.saveDataTemplateService.dataTemplate?.toWho,
                true
              )
            };
            this.saveDataTemplateService.saveDataTemplate(confirmation);
            this.saveDataTemplateService.setUpdateComponent(true);
          } else if (data.completed) {
            const success: ISaveDataTemplate = {
              ...this.saveDataTemplateService.dataTemplate,
              stepActive: PropertyTemplate.success,
              success: transferWithdrawalSuccessMapper.bind(this)(
                data?.response
              )
            };
            this.saveDataTemplateService.saveDataTemplate(success);
            this.configTemplate.changeStep(
              CONFIG_TEMPLATE_TRANSFER_WITHDRAWAL.router[2]
            );
          }
        })
    );

    this._subs.push(
      this.saveDataTemplateService.actionConfirm$.subscribe((_) =>
        this.facade.fetchTransferWithdrawal(
          transferWithdrawalServiceMapper(
            this.saveDataTemplateService.dataTemplate.toWho
          )
        )
      )
    );
  }
}
