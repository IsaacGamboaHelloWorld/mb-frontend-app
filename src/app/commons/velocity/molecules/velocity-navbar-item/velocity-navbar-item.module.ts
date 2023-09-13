import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VelocityNavbarItemComponent } from './velocity-navbar-item.component';

@NgModule({
  declarations: [VelocityNavbarItemComponent],
  exports: [VelocityNavbarItemComponent, RouterModule],
  imports: [CommonModule, RouterModule]
})
export class VelocityNavbarItemModule {}
