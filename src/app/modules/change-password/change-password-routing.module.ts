import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordPage } from './change-password.page';
import { ChangePasswordComponent } from '@modules/change-password/components/change-password/change-password.component';
import { SuccessfulChangeComponent } from '@modules/change-password/components/successful-change/successful-change.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage,
    children: [
      {
        path: '',
        component: ChangePasswordComponent
      },
      {
        path: 'exitoso',
        component: SuccessfulChangeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordPageRoutingModule {}
