import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityToggleLabelComponent } from '@commons/velocity/molecules/velocity-toggle-label/velocity-toggle-label.component';

@NgModule({
  declarations: [VelocityToggleLabelComponent],
  imports: [CommonModule],
  exports: [VelocityToggleLabelComponent]
})
export class VelocityToggleLabelModule {}
