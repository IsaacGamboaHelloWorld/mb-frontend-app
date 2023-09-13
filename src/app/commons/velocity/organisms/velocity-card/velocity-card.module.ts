import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardComponent } from '@commons/velocity/organisms/velocity-card/velocity-card.component';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  declarations: [VelocityCardComponent],
  imports: [CommonModule, VelocityButtonModule],
  exports: [VelocityCardComponent]
})
export class VelocityCardModule {}
