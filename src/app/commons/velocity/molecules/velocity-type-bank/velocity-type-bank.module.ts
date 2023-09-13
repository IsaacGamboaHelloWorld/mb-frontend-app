import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { VelocityTypeBankComponent } from '@commons/velocity/molecules/velocity-type-bank/velocity-type-bank.component';

@NgModule({
  declarations: [VelocityTypeBankComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityTypeBankComponent]
})
export class VelocityTypeBankModule {}
