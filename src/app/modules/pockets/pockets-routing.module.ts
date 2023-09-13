import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { POCKETS_ROUTES } from '@modules/pockets/pockets.routing';

@NgModule({
  imports: [RouterModule.forChild(POCKETS_ROUTES)],
  exports: [RouterModule]
})
export class PocketsRoutingModule {}
