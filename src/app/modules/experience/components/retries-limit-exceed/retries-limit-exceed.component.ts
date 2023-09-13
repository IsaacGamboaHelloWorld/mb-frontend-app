import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { NavController } from '@ionic/angular';

import { HOME } from '@commons/constants/navigatie-global';
import { PageView } from '@commons/decorators/page-view.decorator';
import { UrlExperience } from '@commons/constants/url-experience';

@PageView(UrlExperience.LIMIT_EXCEED, UrlExperience.LIMIT_EXCEED)
@Component({
  selector: '[app-retries-limit-exceed]',
  templateUrl: './retries-limit-exceed.component.html',
  styleUrls: ['./retries-limit-exceed.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RetriesLimitExceedComponent {
  constructor(private navController: NavController) {}

  public back(): void {
    this.navController.navigateRoot([HOME]);
  }
}
