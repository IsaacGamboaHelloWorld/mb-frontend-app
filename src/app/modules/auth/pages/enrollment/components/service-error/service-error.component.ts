import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { UrlEnrollment } from '@commons/constants/url-enrollment';
import { PageView } from '@commons/decorators/page-view.decorator';

@PageView(UrlEnrollment.SERVICE_ERROR, UrlEnrollment.SERVICE_ERROR)
@Component({
  selector: '[app-service-error]',
  templateUrl: './service-error.component.html',
  styleUrls: ['./service-error.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceErrorComponent {
  constructor() {}
}
