import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvancesPage } from './advances.page';
import { InitTemplateAdvanceGuard } from '@modules/detail/advances/new-advance/guard/init-template-advance.guard';

const routes: Routes = [
  {
    path: '',
    component: AdvancesPage,
    canActivate: [InitTemplateAdvanceGuard],
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
export class AdvancesRoutingModule {}
