import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BiometricPage } from './biometric.page';
import { BiometricTermsComponent } from '@modules/biometric/components/biometric-terms/biometric-terms.component';
import { SuccessfulRemovalComponent } from '@modules/biometric/components/successful-removal/successful-removal.component';

const routes: Routes = [
  {
    path: '',
    component: BiometricPage,
    children: [
      {
        path: '',
        component: BiometricTermsComponent
      },
      {
        path: 'registrado',
        component: SuccessfulRemovalComponent
      },
      {
        path: 'eliminado',
        component: SuccessfulRemovalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiometricPageRoutingModule {}
