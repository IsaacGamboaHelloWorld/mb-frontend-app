import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgOtpInputComponent } from './components/ng-otp-input/ng-otp-input.component';
import { KeysOtpPipe } from '@commons/components/ng-otp-input/pipes/keys-otp.pipe';
import { NumberOnlyDirective } from '@commons/components/ng-otp-input/directives/number-only.directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [NgOtpInputComponent, KeysOtpPipe, NumberOnlyDirective],
  exports: [NgOtpInputComponent],
  providers: [KeysOtpPipe]
})
export class NgOtpInputModule {}
