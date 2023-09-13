import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  IPaymentsState,
  paymentsFeatureName
} from '@modules/payments/store/payments.state';
import { EffectsModule } from '@ngrx/effects';
import { BillersEffect } from '@modules/payments/store/effects/billers.effect';
import { LoansEffect } from '@modules/payments/store/effects/loans.effect';
import { TaxesEffect } from '@modules/payments/store/effects/taxes.effect';
import { PilaEffect } from '@modules/payments/store/effects/pila.effect';
import { paymentsRootReducer } from '@modules/payments/store/reducers';
import { BillersService } from '@modules/payments/services/billers.service';
import { LoansService } from '@modules/payments/services/loans.service';
import { PilaPaymentService } from '@modules/payments/services/pila-payment.service';
import { TaxPaymentService } from '@modules/payments/services/tax-payment.service';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

export const FEATURE_PAYMENTS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IPaymentsState>
>('New Payment Module State');

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(paymentsFeatureName, FEATURE_PAYMENTS_REDUCER_TOKEN),
    EffectsModule.forFeature([
      BillersEffect,
      LoansEffect,
      TaxesEffect,
      PilaEffect
    ]),
    CustomHeaderModule
  ],
  providers: [
    BillersService,
    LoansService,
    PilaPaymentService,
    TaxPaymentService,
    {
      provide: FEATURE_PAYMENTS_REDUCER_TOKEN,
      useValue: paymentsRootReducer
    }
  ]
})
export class PaymentsModule {}
