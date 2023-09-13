import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { PushNotificationPageRoutingModule } from './push-notification-routing.module';

import { PushNotificationPage } from './push-notification.page';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityCheckboxSlideModule } from '@commons/velocity/atoms/velocity-checkout-slide/velocity-checkbox-slide.module';
import { PushNotificationService } from '@modules/push-notification/services/push-notification.service';
import {
  IPushNotificationState,
  pushNotificationFeatureName
} from '@modules/push-notification/store/push.state';
import { pushNotificationRootReducer } from '@modules/push-notification/store/reducers';
import { PushNotificationFacade } from '@modules/push-notification/push-notification.facade';
import { EffectsModule } from '@ngrx/effects';
import { PushEffect } from '@modules/push-notification/store/push.effect';

export const FEATURE_PUSH_NOTIFICATION_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IPushNotificationState>
>('Push Notification Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushNotificationPageRoutingModule,
    CustomHeaderModule,
    VelocityImageTitleModule,
    VelocityCheckboxSlideModule,
    GlobalPipesModule,
    StoreModule.forFeature(
      pushNotificationFeatureName,
      FEATURE_PUSH_NOTIFICATION_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PushEffect])
  ],
  declarations: [PushNotificationPage],
  providers: [
    PushNotificationService,
    PushNotificationFacade,
    {
      provide: FEATURE_PUSH_NOTIFICATION_REDUCER_TOKEN,
      useValue: pushNotificationRootReducer
    }
  ]
})
export class PushNotificationPageModule {}
