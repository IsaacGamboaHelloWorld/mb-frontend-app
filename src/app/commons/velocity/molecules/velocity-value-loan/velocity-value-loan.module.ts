import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityValueLoanComponent } from '@commons/velocity/molecules/velocity-value-loan/velocity-value-loan.component';

@NgModule({
  declarations: [VelocityValueLoanComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityValueLoanComponent]
})
export class VelocityValueLoanModule {}
