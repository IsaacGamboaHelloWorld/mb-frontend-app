import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROOT_ROUTES } from '@app/app.routing';

@NgModule({
  imports: [
    RouterModule.forRoot(ROOT_ROUTES, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
