import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VelocityCardPocketsComponent } from '@commons/velocity/organisms/velocity-card-pockets/velocity-card-pockets.component';
import { VelocityBadgeModule } from '@commons/velocity/atoms/velocity-badge/velocity-badge.module';

@NgModule({
  declarations: [VelocityCardPocketsComponent],
  imports: [CommonModule, IonicModule, VelocityBadgeModule],
  exports: [VelocityCardPocketsComponent]
})
export class VelocityCardPocketsModule {}
