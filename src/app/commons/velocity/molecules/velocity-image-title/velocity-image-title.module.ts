import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityImageTitleComponent } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.component';

@NgModule({
  declarations: [VelocityImageTitleComponent],
  exports: [VelocityImageTitleComponent],
  imports: [CommonModule]
})
export class VelocityImageTitleModule {}
