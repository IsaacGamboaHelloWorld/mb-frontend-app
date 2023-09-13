import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { VelocityBoxInputComponent } from '@commons/velocity/molecules/velocity-box-input/velocity-box-input.component';

@NgModule({
  declarations: [VelocityBoxInputComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityBoxInputComponent]
})
export class VelocityBoxInputModule {}
