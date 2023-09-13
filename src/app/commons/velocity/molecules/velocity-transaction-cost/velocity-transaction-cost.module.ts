import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityTransactionCostComponent } from '@commons/velocity/molecules/velocity-transaction-cost/velocity-transaction-cost.component';

@NgModule({
  declarations: [VelocityTransactionCostComponent],
  imports: [CommonModule],
  exports: [VelocityTransactionCostComponent]
})
export class VelocityTransactionCostModule {}
