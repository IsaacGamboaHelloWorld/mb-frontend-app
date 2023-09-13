import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { HOME } from '@commons/constants/navigatie-global';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { KEYS } from '@commons/constants/global';
import { openModalBiometric } from '@commons/helpers/modal-biometric.helper';
import { NavController } from '@ionic/angular';
import { ModalService } from '@commons/services/modal.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { AuthService } from '@commons/services/auth/auth.service';
import {
  GROUP_MEMO_GLOBAL,
  memoClosureGlobal
} from '@commons/memorize/global.memorize';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

@Component({
  selector: 'app-successful-change',
  templateUrl: './successful-change.component.html',
  styleUrls: ['./successful-change.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessfulChangeComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private facade: ChangePasswordFacade,
    private navCtrl: NavController,
    private modalService: ModalService,
    private securityStorageService: AdlSecureStorageService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    Promise.all([
      this.securityStorageService.get(KEYS.BIOMETRIC),
      this.securityStorageService.get(KEYS.MODAL_BIOMETRIC)
    ]).then(([hasConfigBiometric, hasModalBiometric]) => {
      if (
        memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true) &&
        !hasConfigBiometric &&
        !hasModalBiometric
      ) {
        openModalBiometric(
          this.modalService,
          this.securityStorageService,
          this.navCtrl,
          this.translateService
        );
      }
      this._updatePassword(!isNullOrUndefined(hasConfigBiometric));
    });
  }

  ngOnDestroy(): void {
    this.facade.resetChangePassword();
    this.authService.setData = null;
  }

  public redirect(): void {
    this.router.navigate([HOME]);
  }

  private _updatePassword(hasConfigBiometric: boolean): void {
    memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true) &&
      hasConfigBiometric &&
      this.securityStorageService.get(KEYS.BIOMETRIC).then((biometric) => {
        if (!!biometric) {
          const data = JSON.parse(biometric);
          const newBiometric = {
            ...data,
            password: this.authService.temporalData
          };
          this.securityStorageService.put(
            KEYS.BIOMETRIC,
            JSON.stringify(newBiometric),
            true
          );
        }
      });
  }
}
