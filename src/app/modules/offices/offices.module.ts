import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { OfficesPageRoutingModule } from './offices-routing.module';

import { OfficesPage } from './offices.page';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OfficesPageRoutingModule,
    TranslateModule,
    CustomHeaderModule
  ],
  declarations: [OfficesPage]
})
export class OfficesPageModule {}
