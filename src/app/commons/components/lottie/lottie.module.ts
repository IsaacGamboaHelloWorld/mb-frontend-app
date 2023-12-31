import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LottieAnimationComponent } from '@commons/components/lottie/lottie-animation.component';

@NgModule({
  declarations: [LottieAnimationComponent],
  imports: [CommonModule],
  exports: [LottieAnimationComponent]
})
export class LottieModule {}
