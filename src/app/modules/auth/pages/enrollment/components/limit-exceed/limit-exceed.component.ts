import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';

@PageView(UrlEnrollment.LIMIT_EXCEED, UrlEnrollment.LIMIT_EXCEED)
@Component({
  selector: '[app-limit-exceed]',
  templateUrl: './limit-exceed.component.html',
  styleUrls: ['./limit-exceed.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LimitExceedComponent {
  constructor() {}
}
