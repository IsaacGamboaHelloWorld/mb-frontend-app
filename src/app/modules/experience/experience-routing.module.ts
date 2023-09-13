import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperiencePage } from './experience.page';
import { ActivateCardComponent } from '@modules/experience/components/activate-card/activate-card.component';

const routes: Routes = [
  {
    path: '',
    component: ExperiencePage
  },
  {
    path: 'informacion',
    component: ActivateCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperiencePageRoutingModule {}
