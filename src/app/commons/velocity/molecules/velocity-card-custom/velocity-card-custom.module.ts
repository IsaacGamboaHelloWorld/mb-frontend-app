import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardCustomComponent } from '@commons/velocity/molecules/velocity-card-custom/velocity-card-custom.component';

@NgModule({
  declarations: [VelocityCardCustomComponent],
  imports: [CommonModule],
  exports: [VelocityCardCustomComponent]
})
export class VelocityCardCustomModule {}
