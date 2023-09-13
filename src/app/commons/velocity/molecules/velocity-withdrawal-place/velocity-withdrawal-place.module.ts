import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityWithdrawalPlaceComponent } from '@commons/velocity/molecules/velocity-withdrawal-place/velocity-withdrawal-place.component';

@NgModule({
  declarations: [VelocityWithdrawalPlaceComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityWithdrawalPlaceComponent]
})
export class VelocityWithdrawalPlaceModule {}
