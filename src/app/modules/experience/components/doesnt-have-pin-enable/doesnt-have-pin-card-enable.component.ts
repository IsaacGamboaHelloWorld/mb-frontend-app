import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import {
  EXPERIENCE_SERVICE_ITEMS_LIST,
  IExperienceServiceItem
} from '@modules/experience/constants/havePinDebitCardEnable.constant';
import { ModalService } from '@commons/services/modal.service';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import {
  ACTIVATE_CARD_INFO,
  PRODUCTS_REQUEST
} from '@commons/constants/navigatie-global';
import { PageView } from '@commons/decorators/page-view.decorator';
import { UrlExperience } from '@commons/constants/url-experience';

@PageView(
  UrlExperience.DOESNT_HAVE_PIN_DEBIT_CARD_ENABLED,
  UrlExperience.DOESNT_HAVE_PIN_DEBIT_CARD_ENABLED
)
@Component({
  selector: '[doesnt-have-pin-card-enable]',
  templateUrl: './doesnt-have-pin-card-enable.component.html',
  styleUrls: ['./doesnt-have-pin-card-enable.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoesntHavePinCardEnableComponent implements OnInit {
  constructor(
    private _modalService: ModalService,
    private _translateService: TranslateService,
    private router: Router
  ) {}

  get experienceServicesItems(): IExperienceServiceItem[] {
    return EXPERIENCE_SERVICE_ITEMS_LIST;
  }

  ngOnInit(): void {}

  public openModal(): void {
    this._modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-notification-bell',
        iconType: 'information',
        title: this._translateService.instant(
          'EXPERIENCE.DOESNT_HAVE_PIN_ENABLE.MODAL.TITLE'
        ),
        areButtonsWidthComplete: true,
        description: this._translateService.instant(
          'EXPERIENCE.DOESNT_HAVE_PIN_ENABLE.MODAL.DESCRIPTION'
        ),
        secondBtn: this._translateService.instant(
          'EXPERIENCE.DOESNT_HAVE_PIN_ENABLE.MODAL.BTN_SECOND'
        ),
        firstBtn: this._translateService.instant(
          'EXPERIENCE.DOESNT_HAVE_PIN_ENABLE.MODAL.BTN'
        ),
        eventSecondBtn: this._navigateToActiveCardInfo.bind(this),
        eventFirstBtn: this._navigateToOpenAcount.bind(this)
      },
      'default-modal',
      false,
      true
    );
  }

  private _navigateToOpenAcount(): void {
    this.router.navigate([PRODUCTS_REQUEST]);
  }

  private _navigateToActiveCardInfo(): void {
    this.router.navigate([ACTIVATE_CARD_INFO]);
  }
}
