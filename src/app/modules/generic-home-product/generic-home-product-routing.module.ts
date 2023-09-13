import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericHomeProductPage } from './generic-home-product.page';

const routes: Routes = [
  {
    path: '',
    component: GenericHomeProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericHomeProductPageRoutingModule {}
