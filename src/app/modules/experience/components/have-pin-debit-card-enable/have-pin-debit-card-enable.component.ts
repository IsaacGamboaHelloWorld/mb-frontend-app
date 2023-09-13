import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  EXPERIENCE_SERVICE_ITEMS_LIST,
  IExperienceServiceItem
} from '@modules/experience/constants/havePinDebitCardEnable.constant';
import { AbstractExperienceComponent } from '@modules/experience/abstract-experience.component';
import { PageView } from '@commons/decorators/page-view.decorator';
import { UrlExperience } from '@commons/constants/url-experience';

@PageView(
  UrlExperience.HAVE_PIN_DEBIT_CARD_ENABLED,
  UrlExperience.HAVE_PIN_DEBIT_CARD_ENABLED
)
@Component({
  selector: '[have-pin-debit-card-enable]',
  templateUrl: './have-pin-debit-card-enable.component.html',
  styleUrls: ['./have-pin-debit-card-enable.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HavePinDebitCardEnable extends AbstractExperienceComponent
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  get experienceServicesItems(): IExperienceServiceItem[] {
    return EXPERIENCE_SERVICE_ITEMS_LIST;
  }

  ngOnInit() {}

  public sendHavePin(): void {
    this.submitForm({});
  }
}
