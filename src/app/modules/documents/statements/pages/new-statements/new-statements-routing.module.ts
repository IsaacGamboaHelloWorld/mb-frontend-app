import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewStatementsPage } from './new-statements.page';

const routes: Routes = [
  {
    path: '',
    component: NewStatementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewStatementsPageRoutingModule {}
