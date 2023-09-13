import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeActivePage } from './home-active.page';
import { InitTemplateCreditCardGuard } from '@modules/activate-credit-card/guard/init-template-credit-card.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeActivePage,
    canActivate: [InitTemplateCreditCardGuard],
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
export class HomeActivePageRoutingModule {}
