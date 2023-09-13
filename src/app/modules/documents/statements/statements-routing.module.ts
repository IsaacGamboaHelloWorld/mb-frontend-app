import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () =>
      import('./pages/new-statements/new-statements.module').then(
        (m) => m.NewStatementsPageModule
      )
  },
  {
    path: 'detalle',
    loadChildren: () =>
      import(
        './pages/statements-product-detail/statements-product-detail.module'
      ).then((m) => m.StatementsProductDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementsRoutingModule {}
