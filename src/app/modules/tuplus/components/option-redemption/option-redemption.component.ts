import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';

import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { environment } from '@environment/environment';
import {
  BENEFITSCARD,
  OPTION_TO_REDEEM,
  OptionRedeem,
  REDEEMCARD
} from '@modules/tuplus/constants/fixed-amount.constant';
import {
  HOME,
  TUPLUS_DETAIL,
  TUPLUS_WHERE_TO_REDEEM
} from '@commons/constants/navigatie-global';
import { TuplusAbstract } from '@modules/tuplus/utils/tuplus.abstract';
import { TUPLUS } from '@commons/constants/global';
import { CONFIG_TEMPLATE_ADVANCES } from '@modules/detail/advances/new-advance/constants/config.constant';

@Component({
  selector: 'app-option-redemption',
  templateUrl: './option-redemption.component.html',
  styleUrls: ['./option-redemption.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class OptionRedemptionComponent extends TuplusAbstract
  implements OnInit {
  @Output() onChange: EventEmitter<void>;
  private _loadingConfiguration: boolean;
  private _errorConfiguration: boolean;
  private _totalPoints: number;
  private _tuplusPoints: Subscription;
  private _configuration: Subscription;
  private _originRoute: string;
  private _beforeRoute: string;

  constructor(protected injector: Injector, public facade: TuplusFacade) {
    super(injector);
  }

  ngOnInit(): void {
    this.isLoadingConfiguration$;
    this.beforeRoute();
    this.originRoute();
  }

  ionViewDidLeave(): void {
    this._tuplusPoints?.unsubscribe();
    this._configuration?.unsubscribe();
  }

  get redeemCard(): OptionRedeem {
    return REDEEMCARD;
  }

  get benefitsCard(): OptionRedeem {
    return BENEFITSCARD;
  }

  get typeOptionToRedeem(): OptionRedeem[] {
    return OPTION_TO_REDEEM;
  }

  get isLoadingConfiguration$(): boolean {
    this._configuration = this.facade.conversionFactor$?.subscribe((value) => {
      this._loadingConfiguration = value?.loading;
    });
    return this._loadingConfiguration;
  }

  public originRoute(): void {
    this.facade.originUrl$?.pipe(first()).subscribe((url) => {
      this._originRoute = url;
    });
  }

  public beforeRoute(): void {
    this.facade.beforeUrl$?.pipe(first()).subscribe((url) => {
      this._beforeRoute = url;
    });
  }

  public validateStatusConfiguration(idCard): boolean {
    if (idCard === 1) {
      this._configuration = this.facade.conversionFactor$?.subscribe(
        (value) => {
          this._errorConfiguration = value?.error;
        }
      );
      return this._errorConfiguration;
    }
  }

  public totalPointsTuplus(): Subscription {
    return this.facade.tuplusBalance$?.pipe(take(1)).subscribe((value) => {
      this._totalPoints = value?.information?.totalPoints;
    });
  }

  public validateOnTypeCard(idCard): void {
    this.totalPointsTuplus();
    idCard == 1 ? this.validatePointsTuplus() : this.openModalBeneficios();
  }

  public validatePointsTuplus(): void {
    if (this._errorConfiguration) {
      return;
    } else if (this._totalPoints < TUPLUS.MIN_POINTS) {
      return this.toastValidatePoints();
    } else {
      this.navCtrl.navigateForward([TUPLUS_WHERE_TO_REDEEM]);
    }
  }

  public openBrowser(): void {
    window.open(environment.external_url.tuplus, '_system', 'location=no');
    this.facade.logout();
  }

  public back(): void {
    if (
      (this._beforeRoute === '/' ||
        this._beforeRoute === TUPLUS_WHERE_TO_REDEEM) &&
      this._originRoute === '/'
    ) {
      this.navCtrl.navigateBack(HOME);
    } else if (
      (this._beforeRoute === TUPLUS_DETAIL ||
        this._beforeRoute === TUPLUS_WHERE_TO_REDEEM) &&
      this._originRoute === TUPLUS_DETAIL
    ) {
      this.navCtrl.navigateBack(TUPLUS_DETAIL);
    }
    this.facade?.resetSourcePath();
  }

  public toastValidatePoints(): void {
    return this.facade.openToast(
      this.translateService.instant('TUPLUS.OPTION_TO_REDEEM.ERROR_MESSAGE'),
      'info'
    );
  }

  public openModalBeneficios(): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-warning-hex',
        iconType: 'warning',
        title: this.translateService.instant('REDIRECT'),
        hasInLineLink: true,
        description: this.translateService.instant('TUPLUS.DESCRIPTION_MODAL'),
        firstBtn: this.translateService.instant('CONTINUE'),
        secondBtn: this.translateService.instant('CANCEL'),
        eventFirstBtn: this.openBrowser.bind(this),
        eventSecondBtn: this.closeModal.bind(this)
      },
      'default-modal',
      false,
      true
    );
  }
}
