import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityErrorComponent } from '@commons/velocity/atoms/velocity-error/velocity-error.component';

@NgModule({
  declarations: [VelocityErrorComponent],
  imports: [CommonModule],
  exports: [VelocityErrorComponent]
})
export class VelocityErrorModule {}
