import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePage } from '@modules/home/home.page';
import { VelocityButtonModule } from '@commons/velocity/atoms/velocity-button/velocity-button.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    VelocityButtonModule
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
