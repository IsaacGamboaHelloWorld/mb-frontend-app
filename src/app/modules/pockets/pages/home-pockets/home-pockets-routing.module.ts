import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePocketsPage } from './home-pockets.page';

const routes: Routes = [
  {
    path: '',
    component: HomePocketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePocketsPageRoutingModule {}
