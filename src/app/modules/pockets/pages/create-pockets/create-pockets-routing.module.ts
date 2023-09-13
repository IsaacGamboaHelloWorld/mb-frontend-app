import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePocketsPage } from './create-pockets.page';
import { InitTemplateCreatePocketGuard } from '@modules/pockets/pages/create-pockets/guard/init-template-create-pocket.guard';

const routes: Routes = [
  {
    path: '',
    component: CreatePocketsPage,
    canActivate: [InitTemplateCreatePocketGuard],
    loadChildren: () =>
      import(
        '@commons/velocity/templates/advance-template/advance-template.module'
      ).then((m) => m.AdvanceTemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePocketsPageRoutingModule {}
