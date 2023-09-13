import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { NavController } from '@ionic/angular';

import { HOME } from '@commons/constants/navigatie-global';
import { PageView } from '@commons/decorators/page-view.decorator';
import { UrlExperience } from '@commons/constants/url-experience';

@PageView(UrlExperience.COMPLETED, UrlExperience.COMPLETED)
@Component({
  selector: '[app-experience-completed]',
  templateUrl: './experience-completed.component.html',
  styleUrls: ['./experience-completed.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceCompletedComponent {
  constructor(private navController: NavController) {}

  public back(): void {
    this.navController.navigateRoot([HOME]);
  }
}
