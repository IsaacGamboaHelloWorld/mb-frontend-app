import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityCardLoanComponent } from '@commons/velocity/molecules/velocity-card-loan/velocity-card-loan.component';

@NgModule({
  declarations: [VelocityCardLoanComponent],
  exports: [VelocityCardLoanComponent],
  imports: [CommonModule, IonicModule]
})
export class VelocityCardLoanModule {}
