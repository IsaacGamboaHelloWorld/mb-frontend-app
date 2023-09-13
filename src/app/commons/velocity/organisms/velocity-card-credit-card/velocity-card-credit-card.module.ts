import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityCardCreditCardComponent } from '@commons/velocity/organisms/velocity-card-credit-card/velocity-card-credit-card.component';

@NgModule({
  declarations: [VelocityCardCreditCardComponent],
  imports: [CommonModule],
  exports: [VelocityCardCreditCardComponent]
})
export class VelocityCardCreditCardModule {}
