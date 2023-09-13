import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPaymentPageRoutingModule } from './new-payment-routing.module';
import { NewPaymentPage } from './new-payment.page';
import { QrService } from '@modules/qr/new-payment/services/qr.service';
import {
  IQrState,
  qrFeatureName
} from '@modules/qr/new-payment/store/qr.state';
import { QrRootReducer } from '@modules/qr/new-payment/store/reducers';
import { QrFacade } from '@modules/qr/new-payment/qr.facade';
import { QrEffect } from '@modules/qr/new-payment/store/qr.effect';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ToWhoQrComponent } from '@modules/qr/new-payment/components/to-who-qr/to-who-qr.component';
import { VelocityCardLiteCreditCardModule } from '@commons/velocity/organisms/velocity-card-lite-credit-card/velocity-card-lite-credit-card.module';
import { VelocitySumSubtractModule } from '@commons/velocity/molecules/velocity-sum-subtract/velocity-sum-subtract.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { AnimationService } from '@modules/qr/new-payment/services/animation.service';
import { InitTemplateQrGuard } from '@modules/qr/new-payment/guard/init-template-qr.guard';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

const FEATURE_QR_REDUCE_TOKEN = new InjectionToken<ActionReducerMap<IQrState>>(
  'Qr module State'
);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPaymentPageRoutingModule,
    GlobalPipesModule,
    FormsModule,
    ReactiveFormsModule,
    VelocityCardLiteCreditCardModule,
    VelocitySumSubtractModule,
    VelocityButtonModule,
    StoreModule.forFeature(qrFeatureName, FEATURE_QR_REDUCE_TOKEN),
    EffectsModule.forFeature([QrEffect]),
    CustomHeaderModule
  ],
  declarations: [NewPaymentPage, ToWhoQrComponent],
  providers: [
    QrFacade,
    QrService,
    AnimationService,
    InitTemplateQrGuard,
    {
      provide: FEATURE_QR_REDUCE_TOKEN,
      useValue: QrRootReducer
    }
  ]
})
export class NewPaymentPageModule {}
