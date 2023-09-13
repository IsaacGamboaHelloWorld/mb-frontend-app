import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MAIN_ROUTES } from '@modules/main-container/main-container.routing';

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTES)],
  exports: [RouterModule]
})
export class MainContainerRoutingModule {}
