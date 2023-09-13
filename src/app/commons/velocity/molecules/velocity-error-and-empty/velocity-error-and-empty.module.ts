import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityErrorAndEmptyComponent } from '@commons/velocity/molecules/velocity-error-and-empty/velocity-error-and-empty.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocityErrorAndEmptyComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocityErrorAndEmptyComponent]
})
export class VelocityErrorAndEmptyModule {}
