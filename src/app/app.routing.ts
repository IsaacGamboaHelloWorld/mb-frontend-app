import { Routes } from '@angular/router';

import { LoggedGuard } from '@commons/guards/logged-guard.service';
import { AuthGuard } from '@commons/guards/auth.guard';
import { DisabledModuleGuard } from '@commons/guards/disabled-module.guard';

export const ROOT_ROUTES: Routes = [
  {
    path: 'iniciar-sesion',
    loadChildren: () =>
      import('./modules/auth/pages/login/login.module').then(
        (m) => m.LoginPageModule
      ),
    canActivate: [LoggedGuard]
  },
  {
    path: 'enrolamiento',
    loadChildren: () =>
      import('./modules/auth/pages/enrollment/enrollment.module').then(
        (m) => m.EnrollmentPageModule
      ),
    canActivate: [LoggedGuard]
  },
  {
    path: 'contactenos',
    loadChildren: () =>
      import('./modules/contacts/contacts.module').then(
        (m) => m.ContactsPageModule
      )
  },
  {
    path: 'visitanos',
    loadChildren: () =>
      import('./modules/offices/offices.module').then(
        (m) => m.OfficesPageModule
      ),
    canActivate: [LoggedGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/main-container/main-container.module').then(
        (m) => m.MainContainerModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [DisabledModuleGuard]
  },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];
