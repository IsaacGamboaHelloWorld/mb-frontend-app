import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityServicePaymentComponent } from '@commons/velocity/molecules/velocity-service-payment/velocity-service-payment.component';

@NgModule({
  declarations: [VelocityServicePaymentComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityServicePaymentComponent]
})
export class VelocityServicePaymentModule {}
