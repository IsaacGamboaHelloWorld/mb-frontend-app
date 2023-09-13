import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { EXPERIENCE } from '@commons/constants/navigatie-global';

@Component({
  selector: 'app-complementary-card',
  templateUrl: './complementary-card.component.html',
  styleUrls: ['./complementary-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplementaryCardComponent {
  constructor(private router: Router) {}

  public navigateToExperience(): void {
    this.router.navigate([EXPERIENCE]);
  }
}
