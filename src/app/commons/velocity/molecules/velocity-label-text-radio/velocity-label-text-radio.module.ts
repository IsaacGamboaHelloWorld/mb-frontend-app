import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityLabelTextRadioComponent } from '@commons/velocity/molecules/velocity-label-text-radio/velocity-label-text-radio.component';

@NgModule({
  declarations: [VelocityLabelTextRadioComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityLabelTextRadioComponent]
})
export class VelocityLabelTextRadioModule {}
