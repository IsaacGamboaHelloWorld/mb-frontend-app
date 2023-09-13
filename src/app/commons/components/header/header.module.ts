import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderFacade } from '@commons/components/header/header.facade';
import { HeaderComponent } from '@commons/components/header/header.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, GlobalPipesModule, IonicModule],
  providers: [HeaderFacade],
  exports: [HeaderComponent]
})
export class HeaderModule {}
