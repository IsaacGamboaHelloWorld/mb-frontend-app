import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityLabelRadioComponent } from '@commons/velocity/molecules/velocity-label-radio/velocity-label-radio.component';

@NgModule({
  declarations: [VelocityLabelRadioComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityLabelRadioComponent]
})
export class VelocityLabelRadioModule {}
