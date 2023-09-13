import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContErrorComponent } from '@modules/forms/cont-error/cont-error.component';
import { VelocityErrorModule } from '@commons/velocity/atoms/velocity-error/velocity-error.module';

@NgModule({
  declarations: [ContErrorComponent],
  imports: [CommonModule, VelocityErrorModule],
  exports: [ContErrorComponent]
})
export class ContErrorModule {}
