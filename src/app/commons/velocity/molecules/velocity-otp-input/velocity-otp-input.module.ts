import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityOtpInputComponent } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input/velocity-otp-input.component';
import { OtpInputDirective } from '@commons/velocity/molecules/velocity-otp-input/velocity-otp-input.directive';

@NgModule({
  declarations: [VelocityOtpInputComponent, OtpInputDirective],
  imports: [CommonModule, IonicModule],
  exports: [VelocityOtpInputComponent]
})
export class VelocityOtpInputModule {}
