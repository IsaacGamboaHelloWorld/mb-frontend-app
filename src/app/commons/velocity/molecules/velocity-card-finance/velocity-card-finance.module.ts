import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardFinanceComponent } from '@commons/velocity/molecules/velocity-card-finance/velocity-card-finance.component';

@NgModule({
  declarations: [VelocityCardFinanceComponent],
  imports: [CommonModule],
  exports: [VelocityCardFinanceComponent]
})
export class VelocityCardFinanceModule {}
