import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityServiceItemComponent } from '@commons/velocity/molecules/velocity-service-item/velocity-service-item.component';

@NgModule({
  declarations: [VelocityServiceItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [VelocityServiceItemComponent]
})
export class VelocityServiceItemModule {}
