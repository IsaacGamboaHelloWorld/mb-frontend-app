import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { CONFIG_TEMPLATE_NEW_PAYMENT_ONE_STEP } from '@modules/payments/new-payment-one-step/constants/config.constant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { NEW_PAYMENT_PILA } from '@commons/constants/navigatie-global';
import { pilaPaymentServiceMapper } from '@modules/payments/new-payment-one-step/mappers/pila-payment.mapper';
import { pilaPaymentConfirmationMapper } from '@modules/payments/new-payment-one-step/mappers/pila-confirmation.mapper';
import { pilaPaymentSuccessMapper } from '@modules/payments/new-payment-one-step/mappers/pila-success.mapper';
import { taxesPaymentConfirmationMapper } from '@modules/payments/new-payment-one-step/mappers/taxes-confirmation.mapper';
import { taxesPaymentSuccessMapper } from '@modules/payments/new-payment-one-step/mappers/taxes-success.mapper';
import { taxesPaymentServiceMapper } from '@modules/payments/new-payment-one-step/mappers/taxes-payment.mapper';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import {
  IPilaPaymentState,
  ITaxesPaymentState
} from '@modules/payments/store/payments.state';

@Component({
  selector: 'app-new-payment-one-step',
  templateUrl: './new-payment-one-step.page.html',
  styleUrls: ['./new-payment-one-step.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NewPaymentOneStepPage extends ConfigGlobalPageAbstractContainer {
  constructor(
    private currencyFormat: CurrencyFormatPipe,
    private facade: PaymentsFacade,
    private saveTemplate: SaveDataTemplateService,
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
    this.facade.resetTaxesCities();
    this.facade.resetTaxesAmountReference();
    this.facade.resetTaxesAgreements();
    this.facade.resetTaxesPayment();
    this.facade.resetPilaAgreements();
    this.facade.resetPilaInformation();
    this.facade.resetPilaPayment();
    this.facade.resetDetailBiller();
    this.facade.resetBarcodeBiller();
  }

  private _watchStatus(): void {
    this.facade.pilaPayment$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((newPayment) => {
        this._resetMethods(
          newPayment,
          pilaPaymentConfirmationMapper,
          pilaPaymentSuccessMapper
        );
      });

    this.facade.taxesPayment$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((newPayment) => {
        this._resetMethods(
          newPayment,
          taxesPaymentConfirmationMapper,
          taxesPaymentSuccessMapper
        );
      });

    this.saveTemplate.actionConfirm$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        if (this.configTemplate.config.defaultUrl === NEW_PAYMENT_PILA) {
          this.facade.fetchPilaPayment(
            pilaPaymentServiceMapper(this.saveTemplate.dataTemplate)
          );
        } else {
          this.facade.fetchTaxesPayment(
            taxesPaymentServiceMapper(this.saveTemplate.dataTemplate)
          );
        }
      });
  }

  private _resetMethods(
    payment: ITaxesPaymentState | IPilaPaymentState,
    confirmationMapper: any,
    successMapper: any
  ): void {
    if (payment?.completed) {
      const success: ISaveDataTemplate = {
        ...this.saveTemplate.dataTemplate,
        stepActive: PropertyTemplate.success,
        success: successMapper.bind(this)(payment?.response)
      };
      this.saveTemplate.saveDataTemplate(success);
      this.configTemplate.changeStep(
        CONFIG_TEMPLATE_NEW_PAYMENT_ONE_STEP.router[2]
      );
    } else if (payment?.error) {
      const confirmation: ISaveDataTemplate = {
        ...this.saveTemplate.dataTemplate,
        confirmation: confirmationMapper.bind(this)(
          this.saveTemplate.dataTemplate
        )
      };
      this.saveTemplate.saveDataTemplate(confirmation);
      this.saveTemplate.setUpdateComponent(true);
    }
  }
}
