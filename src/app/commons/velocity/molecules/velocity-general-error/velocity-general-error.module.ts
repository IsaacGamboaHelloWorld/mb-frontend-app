import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityGeneralErrorComponent } from '@commons/velocity/molecules/velocity-general-error/velocity-general-error.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocityGeneralErrorComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocityGeneralErrorComponent]
})
export class VelocityGeneralErrorModule {}
