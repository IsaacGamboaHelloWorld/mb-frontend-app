import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocitySmallCardComponent } from '@commons/velocity/molecules/velocity-small-card/velocity-small-card.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocitySmallCardComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocitySmallCardComponent]
})
export class VelocitySmallCardModule {}
