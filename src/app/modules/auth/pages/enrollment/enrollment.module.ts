import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { AuthModule } from '@modules/auth/auth.module';
import { EnrollmentPage } from '@modules/auth/pages/enrollment/enrollment.page';
import { EnrollmentPageRoutingModule } from '@modules/auth/pages/enrollment/enrollment-routing.module';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { UniversalPasswordComponent } from '@modules/auth/pages/enrollment/components/universal-password/universal-password.component';
import { ChannelPasswordComponent } from '@modules/auth/pages/enrollment/components/channel-password/channel-password.component';
import { NewUniversalPasswordComponent } from '@modules/auth/pages/enrollment/components/new-universal-password/new-universal-password.component';
import { AcceptChannelPoliciesComponent } from './components/accept-channel-policies/accept-channel-policies.component';
import { VelocityOtpInputModule } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { FillSecureDataComponent } from '@modules/auth/pages/enrollment/components/fill-secure-data/fill-secure-data.component';
import { OtpDataComponent } from '@modules/auth/pages/enrollment/components/otp-data/otp-data.component';
import { HeaderModule } from '@commons/components/header/header.module';
import { LimitExceedComponent } from '@modules/auth/pages/enrollment/components/limit-exceed/limit-exceed.component';
import { ServiceErrorComponent } from '@modules/auth/pages/enrollment/components/service-error/service-error.component';
import { VelocityToastModule } from '@commons/velocity/molecules/velocity-toast/velocity-toast.module';
import { ModalOtpIosComponent } from '@modules/auth/pages/enrollment/components/modal-otp-ios/modal-otp-ios.component';
import { NgOtpInputModule } from '@commons/components/ng-otp-input/ng-otp-input.module';
import { VelocityCustomValidatorMessageModule } from '@commons/velocity/atoms/velocity-custom-validator-message/velocity-custom-validator-message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrollmentPageRoutingModule,
    AuthModule,
    HeaderModule,
    VelocityImageTitleModule,
    VelocityOtpInputModule,
    ContErrorModule,
    VelocityToastModule,
    NgOtpInputModule,
    VelocityCustomValidatorMessageModule
  ],
  declarations: [
    EnrollmentPage,
    UniversalPasswordComponent,
    ChannelPasswordComponent,
    NewUniversalPasswordComponent,
    AcceptChannelPoliciesComponent,
    FillSecureDataComponent,
    OtpDataComponent,
    LimitExceedComponent,
    ServiceErrorComponent,
    ModalOtpIosComponent
  ],
  providers: [InAppBrowser, Keyboard]
})
export class EnrollmentPageModule {}
