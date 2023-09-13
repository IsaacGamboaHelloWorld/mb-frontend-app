import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotpPageRoutingModule } from './totp-routing.module';

import { TotpPage } from './totp.page';
import { TotpService } from '@modules/totp/services/totp.service';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotpPageRoutingModule,
    CustomHeaderModule
  ],
  declarations: [TotpPage],
  providers: [TotpService]
})
export class TotpPageModule {}
