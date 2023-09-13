import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { LottieModule } from '@commons/components/lottie/lottie.module';

@NgModule({
  declarations: [VelocityLoaderComponent],
  imports: [CommonModule, LottieModule],
  exports: [VelocityLoaderComponent]
})
export class VelocityLoaderModule {}
