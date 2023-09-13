import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovePocketsPage } from './move-pockets.page';
import { InitTemplateMovePocketsGuard } from '@modules/pockets/pages/move-pockets/guard/init-template-move-pocket.guard';

const routes: Routes = [
  {
    path: '',
    component: MovePocketsPage,
    canActivate: [InitTemplateMovePocketsGuard],
    loadChildren: () =>
      import(
        '@commons/velocity/templates/basic-template/basic-template.module'
      ).then((m) => m.BasicTemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovePocketsPageRoutingModule {}
