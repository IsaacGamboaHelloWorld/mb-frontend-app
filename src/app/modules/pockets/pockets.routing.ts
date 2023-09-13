import { Routes } from '@angular/router';

export const POCKETS_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home-pockets/home-pockets.module').then(
        (m) => m.HomePocketsPageModule
      )
  },
  {
    path: 'bienvenida',
    loadChildren: () =>
      import('./pages/on-boarding/on-boarding.module').then(
        (m) => m.OnBoardingPageModule
      )
  },
  {
    path: 'editar',
    loadChildren: () =>
      import('./pages/edit-pockets/edit-pockets.module').then(
        (m) => m.EditPocketsPageModule
      )
  },
  {
    path: 'mover',
    loadChildren: () =>
      import('./pages/move-pockets/move-pockets.module').then(
        (m) => m.MovePocketsPageModule
      )
  },
  {
    path: 'nuevo/:type',
    loadChildren: () =>
      import('./pages/create-pockets/create-pockets.module').then(
        (m) => m.CreatePocketsPageModule
      )
  }
];
