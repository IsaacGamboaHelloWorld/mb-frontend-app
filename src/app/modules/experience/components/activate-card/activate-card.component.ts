import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { NavController } from '@ionic/angular';

import { HOME } from '@commons/constants/navigatie-global';

@Component({
  selector: '[app-activate-card]',
  templateUrl: './activate-card.component.html',
  styleUrls: ['./activate-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivateCardComponent {
  constructor(private navController: NavController) {}

  public back(): void {
    this.navController.navigateRoot([HOME]);
  }
}
