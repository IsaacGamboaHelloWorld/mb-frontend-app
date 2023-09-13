import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { CONFIG_TEMPLATE_NEW_PAYMENT } from '@modules/payments/new-payment/constants/config.constant';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import {
  newPaymentBillerServiceMapper,
  newPaymentConfirmationMapper
} from '@modules/payments/new-payment/mappers/confirmation-payment.mapper';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { newPaymentSuccessMapper } from '@modules/payments/new-payment/mappers/success-payment.mapper';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import {
  newPaymentLoanConfirmationMapper,
  newPaymentLoanServiceMapper
} from '@modules/payments/new-payment/mappers/confirmation-payment-loan.mapper';
import {
  NEW_PAYMENT_NOT_REGISTERED,
  NEW_PAYMENT_PUBLIC
} from '@commons/constants/navigatie-global';
import {
  ILoanPaymentState,
  IPayBillerState
} from '@modules/payments/store/payments.state';
import { newPaymentLoanSuccessMapper } from '@modules/payments/new-payment/mappers/success-payment-loan.mapper';
import {
  newPaymentBillerNotRegisteredServiceMapper,
  newPaymentNotRegisteredConfirmationMapper
} from '@modules/payments/new-payment/mappers/confirmation-payment-not-registered.mapper';

@Component({
  selector: 'app-public-private',
  templateUrl: './new-payment.page.html',
  styleUrls: ['./new-payment.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NewPaymentPage extends ConfigGlobalPageAbstractContainer {
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
    this.facade.resetNewPaymentBiller();
    this.facade.resetNewPaymentLoan();
    this.facade.resetSearchBiller();
    this.facade.resetDetailBiller();
    this.facade.resetBarcodeBiller();
    this.facade.resetCreditCard();
  }

  private _watchStatus(): void {
    this.facade.paymentBiller$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((newPayment) => {
        this.resetMethods(
          newPayment,
          this.configTemplate.config.defaultUrl === NEW_PAYMENT_NOT_REGISTERED
            ? newPaymentNotRegisteredConfirmationMapper
            : newPaymentConfirmationMapper,
          newPaymentSuccessMapper
        );
      });

    this.facade.paymentLoan$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.completed || data.error)
      )
      .subscribe((newPayment) => {
        this.resetMethods(
          newPayment,
          newPaymentLoanConfirmationMapper,
          newPaymentLoanSuccessMapper
        );
      });

    this.saveTemplate.actionConfirm$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        if (this.configTemplate.config.defaultUrl === NEW_PAYMENT_PUBLIC) {
          this.facade.fetchNewPaymentBiller(
            newPaymentBillerServiceMapper(this.saveTemplate.dataTemplate)
          );
        } else if (
          this.configTemplate.config.defaultUrl === NEW_PAYMENT_NOT_REGISTERED
        ) {
          this.facade.fetchNewPaymentBiller(
            newPaymentBillerNotRegisteredServiceMapper(
              this.saveTemplate.dataTemplate
            )
          );
        } else {
          this.facade.fetchNewPaymentLoan(
            newPaymentLoanServiceMapper(this.saveTemplate.dataTemplate)
          );
        }
      });
  }

  private resetMethods(
    payment: ILoanPaymentState | IPayBillerState,
    confirmationMapper: any,
    successMapper: any
  ): void {
    if (payment?.completed) {
      const success: ISaveDataTemplate = {
        ...this.saveTemplate.dataTemplate,
        stepActive: PropertyTemplate.success,
        success: successMapper.bind(this)(
          payment?.information,
          this.configTemplate.config.defaultUrl === NEW_PAYMENT_NOT_REGISTERED
            ? 'contract'
            : 'billerId'
        )
      };
      this.saveTemplate.saveDataTemplate(success);
      this.configTemplate.changeStep(CONFIG_TEMPLATE_NEW_PAYMENT.router[4]);
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
