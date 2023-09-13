import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfficesPage } from './offices.page';

const routes: Routes = [
  {
    path: '',
    component: OfficesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesPageRoutingModule {}
