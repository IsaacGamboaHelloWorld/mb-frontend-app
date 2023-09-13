import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessagesPage } from './messages.page';
import { DetailMessageComponent } from '@modules/messages/components/detail-message/detail-message.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  },
  {
    path: 'mensaje/:id',
    component: DetailMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesPageRoutingModule {}
