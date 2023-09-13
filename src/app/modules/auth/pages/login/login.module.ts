import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AuthModule } from '@modules/auth/auth.module';
import { LoginPageRoutingModule } from '@modules/auth/pages/login/login-routing.module';
import { LoginPage } from '@modules/auth/pages/login/login.page';
import { VelocityButtonModule } from '@app/commons/velocity/atoms/velocity-button/velocity-button.module';
import { VelocityImageTitleModule } from '@app/commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { VelocityCheckboxSlideModule } from '@commons/velocity/atoms/velocity-checkout-slide/velocity-checkbox-slide.module';
import { ContModalAuthComponent } from '@modules/auth/pages/login/components/cont-modal-auth/cont-modal-auth.component';
import { VelocityModalLeaveModule } from '@commons/velocity/molecules/velocity-modal-leave/velocity-modal-leave.module';
import { ContErrorModule } from '@modules/forms/cont-error/cont-error.module';
import { GlobalDirectivesModule } from '@commons/directives/global-directives.module';

@NgModule({
  imports: [
    IonicModule,
    LoginPageRoutingModule,
    AuthModule,
    ContErrorModule,
    VelocityButtonModule,
    VelocityImageTitleModule,
    VelocityCheckboxSlideModule,
    VelocityModalLeaveModule,
    GlobalDirectivesModule
  ],
  declarations: [LoginPage, ContModalAuthComponent]
})
export class LoginPageModule {}
