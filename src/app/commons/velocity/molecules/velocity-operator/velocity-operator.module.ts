import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityOperatorComponent } from '@commons/velocity/molecules/velocity-operator/velocity-operator.component';

@NgModule({
  declarations: [VelocityOperatorComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityOperatorComponent]
})
export class VelocityOperatorModule {}
