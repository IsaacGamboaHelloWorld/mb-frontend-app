import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store/src/models';
import { EffectsModule } from '@ngrx/effects';

import { MessagesPageRoutingModule } from './messages-routing.module';
import { MessagesPage } from './messages.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { MessagesFacade } from '@modules/messages/messages.facade';
import { VelocityMessageModule } from '@commons/velocity/molecules/velocity-message/velocity-message.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { DetailMessageComponent } from '@modules/messages/components/detail-message/detail-message.component';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';
import { MessagesService } from '@modules/messages/services/messages.service';
import {
  IMessagesState,
  messagesFeatureName
} from '@modules/messages/store/messages.state';
import { messagesRootReducer } from '@modules/messages/store/reducers';
import { MessagesEffect } from '@modules/messages/store/messages.effect';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

const FEATURE_MESSAGES_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IMessagesState>
>('Messages Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesPageRoutingModule,
    GlobalPipesModule,
    VelocityMessageModule,
    VelocityImageTitleModule,
    CustomHeaderModule,
    StoreModule.forFeature(messagesFeatureName, FEATURE_MESSAGES_REDUCER_TOKEN),
    EffectsModule.forFeature([MessagesEffect]),
    VelocityButtonModule
  ],
  declarations: [MessagesPage, DetailMessageComponent],
  providers: [
    AdlSecureStorageService,
    MessagesFacade,
    MessagesService,
    {
      provide: FEATURE_MESSAGES_REDUCER_TOKEN,
      useValue: messagesRootReducer
    }
  ]
})
export class MessagesPageModule {}
