import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardAccountComponent } from '@commons/velocity/organisms/velocity-card-account/velocity-card-account.component';

@NgModule({
  declarations: [VelocityCardAccountComponent],
  imports: [CommonModule],
  exports: [VelocityCardAccountComponent]
})
export class VelocityCardAccountModule {}
