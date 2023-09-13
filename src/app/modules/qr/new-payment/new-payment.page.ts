import { filter, takeUntil } from 'rxjs/operators';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';

import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { QrFacade } from '@modules/qr/new-payment/qr.facade';
import { CONFIG_TEMPLATE_PAYMENT_QR } from '@modules/qr/new-payment/constants/config-qr.constant';
import { QR_ANNULMENT, QR_PAYMENT } from '@commons/constants/navigatie-global';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import {
  qrPaymentConfirmationMapper,
  qrServiceMapper
} from '@modules/qr/new-payment/mappers/confirmation-qr.mapper';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { AnimationService } from '@modules/qr/new-payment/services/animation.service';
import { qrAnnulmentConfirmationMapper } from '@modules/qr/new-payment/mappers/confirmation-qr-annulment.mapper';
import {
  IQrAnnulmentState,
  IQrPaymentState
} from '@modules/qr/new-payment/store/qr.state';
import { qrAnnulmentPaymentSuccessMapper } from '@modules/qr/new-payment/mappers/success-qr-annulment-payment.mapper';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.page.html',
  styleUrls: ['./new-payment.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NewPaymentPage extends ConfigGlobalPageAbstractContainer {
  constructor(
    public animation: AnimationService,
    protected injector: Injector,
    private facade: QrFacade,
    private saveDataTemplateService: SaveDataTemplateService,
    private currencyFormat: CurrencyFormatPipe,
    private navCtrl: NavController
  ) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this.configTemplate.setConfig({
      ...this.configTemplate.config,
      ionContent: this.ionContent
    });
    this.__watchStatus();
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.facade.qrPaymentReset();
    this.facade.qrAnnulmentReset();
    this.facade.qrInfoReset();
    this.facade.qrProductsReset();
  }

  get title(): string {
    return this.translateService.instant(
      this.configTemplate.config.defaultUrl === QR_ANNULMENT
        ? 'QR.TITLE.ANNULMENT'
        : 'QR.TITLE.PAYMENT'
    );
  }

  public backCustom(): void {
    this.configTemplate.config.defaultUrl === QR_ANNULMENT
      ? this.navCtrl.navigateForward([this.configTemplate.config.defaultUrl])
      : this.back();
  }

  private __watchStatus(): void {
    this.facade.qrPayment$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.error || data.completed)
      )
      .subscribe((qrPayment) => {
        this.resetMethods(
          qrPayment,
          qrPaymentConfirmationMapper,
          qrAnnulmentPaymentSuccessMapper
        );
      });

    this.facade.qrAnnulment$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.error || data.completed)
      )
      .subscribe((qrPayment) => {
        this.resetMethods(
          qrPayment,
          qrAnnulmentConfirmationMapper,
          qrAnnulmentPaymentSuccessMapper
        );
      });

    this.saveDataTemplateService.actionConfirm$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        if (this.configTemplate.config.defaultUrl === QR_PAYMENT) {
          this.facade.fetchQrPayment(
            qrServiceMapper(this.saveDataTemplateService.dataTemplate)
          );
        } else {
          this.facade.fetchQrAnnulment({
            qrMetaData: this.saveDataTemplateService.dataTemplate?.toWho
              ?.metadata
          });
        }
      });
  }

  private resetMethods(
    payment: IQrAnnulmentState | IQrPaymentState,
    confirmationMapper: any,
    successMapper: any
  ): void {
    if (payment?.completed) {
      const success: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        stepActive: PropertyTemplate.success,
        success: successMapper.bind(this)(
          payment.information,
          this.configTemplate.config.defaultUrl === QR_PAYMENT
        )
      };
      this.saveDataTemplateService.saveDataTemplate(success);
      this.configTemplate.changeStep(CONFIG_TEMPLATE_PAYMENT_QR.router[2]);
    } else if (payment?.error) {
      const confirmation: ISaveDataTemplate = {
        ...this.saveDataTemplateService.dataTemplate,
        confirmation: confirmationMapper.bind(this)(
          this.saveDataTemplateService.dataTemplate
        )
      };
      this.saveDataTemplateService.saveDataTemplate(confirmation);
      this.saveDataTemplateService.setUpdateComponent(true);
    }
  }
}
