import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockProductPage } from './block-product.page';

const routes: Routes = [
  {
    path: '',
    component: BlockProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockProductPageRoutingModule {}
