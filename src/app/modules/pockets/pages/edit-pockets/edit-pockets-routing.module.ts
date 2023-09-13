import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPocketsPage } from './edit-pockets.page';
import { InitTemplateEditPocketsGuard } from '@modules/pockets/pages/edit-pockets/guard/init-template-edit-pocket.guard';

const routes: Routes = [
  {
    path: '',
    component: EditPocketsPage,
    canActivate: [InitTemplateEditPocketsGuard],
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
export class EditPocketsPageRoutingModule {}
