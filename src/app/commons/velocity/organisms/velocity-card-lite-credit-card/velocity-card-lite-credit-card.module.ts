import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { VelocityCardLiteCreditCardComponent } from '@commons/velocity/organisms/velocity-card-lite-credit-card/velocity-card-lite-credit-card.component';

@NgModule({
  declarations: [VelocityCardLiteCreditCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityCardLiteCreditCardComponent]
})
export class VelocityCardLiteCreditCardModule {}
