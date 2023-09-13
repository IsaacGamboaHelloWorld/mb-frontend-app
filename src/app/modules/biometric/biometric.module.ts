import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { BiometricPageRoutingModule } from './biometric-routing.module';
import { BiometricPage } from './biometric.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';
import { BiometricTermsComponent } from '@modules/biometric/components/biometric-terms/biometric-terms.component';
import { SuccessfulRemovalComponent } from '@modules/biometric/components/successful-removal/successful-removal.component';
import { RemovalConfirmationModalComponent } from '@modules/biometric/components/removal-confirmation-modal/removal-confirmation-modal.component';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VelocityImageTitleModule,
    VelocityButtonModule,
    VelocityModalLeaveModule,
    GlobalPipesModule,
    BiometricPageRoutingModule,
    CustomHeaderModule
  ],
  declarations: [
    BiometricPage,
    BiometricTermsComponent,
    SuccessfulRemovalComponent,
    RemovalConfirmationModalComponent
  ],
  providers: [FingerprintAIO]
})
export class BiometricPageModule {}
