import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TranslateService } from '@ngx-translate/core';

import { KEYS } from '@commons/constants/global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  BIOMETRIC_REGISTERED,
  HOME
} from '@commons/constants/navigatie-global';
import { ModalService } from '@commons/services/modal.service';
import { RemovalConfirmationModalComponent } from '@modules/biometric/components/removal-confirmation-modal/removal-confirmation-modal.component';

@Component({
  selector: 'app-biometric-terms',
  templateUrl: './biometric-terms.component.html',
  styleUrls: ['./biometric-terms.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BiometricTermsComponent implements OnInit {
  public hasBiometric: boolean = false;

  constructor(
    private securityStorageService: AdlSecureStorageService,
    private fingerprintAIO: FingerprintAIO,
    private facade: MainContainerFacade,
    private router: Router,
    private modalService: ModalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this._hasBiometric();
  }

  public async openBiometricSensor(): Promise<void> {
    try {
      const biometric = await this.fingerprintAIO.show({
        title: this.translateService.instant('NAME_BANK'),
        description: this.translateService.instant(
          'BIOMETRIC.FINGERPRINT_READER.DESCRIPTION'
        ),
        cancelButtonTitle: this.translateService.instant(
          'BIOMETRIC.FINGERPRINT_READER.CANCEL_BUTTON'
        ),
        disableBackup: true
      });
      !!biometric
        ? await this._validateBiometric()
        : this.facade.openToast(
            this.translateService.instant('BIOMETRIC.ERRORS.ERROR_REGISTERING')
          );
    } catch {
      this.facade.openToast(
        this.translateService.instant('BIOMETRIC.ERRORS.NOT_FOUND_READER')
      );
    }
  }

  public openModal(): void {
    this.modalService.openModal(RemovalConfirmationModalComponent, {
      title: this.translateService.instant(
        'BIOMETRIC.DELETE_BIOMETRIC_MODAL.TITLE'
      ),
      description: this.translateService.instant(
        'BIOMETRIC.DELETE_BIOMETRIC_MODAL.DESCRIPTION'
      ),
      firstBtn: this.translateService.instant(
        'BIOMETRIC.DELETE_BIOMETRIC_MODAL.PRIMARY_BTN'
      ),
      secondBtn: this.translateService.instant(
        'BIOMETRIC.DELETE_BIOMETRIC_MODAL.SECONDARY_BTN'
      ),
      hasInLineLink: true
    });
  }

  public goHome(): void {
    this.router.navigate([HOME]);
  }

  private async _validateBiometric(): Promise<void> {
    const temp = await this.securityStorageService.get(KEYS.TEMPORAL_DATA);
    !!temp
      ? await this.securityStorageService.put(KEYS.BIOMETRIC, temp, true)
      : this.facade.openToast(
          this.translateService.instant(
            'BIOMETRIC.ERRORS.NOT_FOUND_TEMPORAL_KEY'
          )
        );

    this._navigateTo(BIOMETRIC_REGISTERED);
  }

  private async _hasBiometric(): Promise<void> {
    this.hasBiometric = !!(await this.securityStorageService.get(
      KEYS.BIOMETRIC
    ));
  }

  private _navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
