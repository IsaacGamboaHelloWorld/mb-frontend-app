import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { ContactService } from '@modules/contacts/services/contact.service';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ContactsPageRoutingModule,
    GlobalPipesModule,
    CustomHeaderModule
  ],
  declarations: [ContactsPage],
  providers: [ContactService]
})
export class ContactsPageModule {}
