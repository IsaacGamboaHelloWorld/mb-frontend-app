import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardServiceComponent } from '@commons/velocity/molecules/velocity-card-service/velocity-card-service.component';
import { LottieModule } from '@commons/components/lottie/lottie.module';

@NgModule({
  declarations: [VelocityCardServiceComponent],
  imports: [CommonModule, LottieModule],
  exports: [VelocityCardServiceComponent]
})
export class VelocityCardServiceModule {}
