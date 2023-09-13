import { NavController } from '@ionic/angular';
import { BIOMETRIC } from '@commons/constants/navigatie-global';
import { ModalService } from '@commons/services/modal.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { TranslateService } from '@ngx-translate/core';

export const modalBiometricFirstButton = (
  navCtrl: NavController,
  modalService: ModalService,
  url: string = BIOMETRIC
) => {
  closeModalBiometric(modalService);
  navCtrl.navigateForward([url]);
};

export const modalBiometricSecondButton = (
  securityStorageService: AdlSecureStorageService,
  modalService: ModalService,
  key: string = KEYS.MODAL_BIOMETRIC
) => {
  closeModalBiometric(modalService);
  securityStorageService.put(key, 'modal', true).then();
};

export const openModalBiometric = (
  modalService: ModalService,
  securityStorageService: AdlSecureStorageService,
  navCtrl: NavController,
  translateService: TranslateService
) => {
  modalService
    .openModal(
      ModalGenericComponent,
      {
        type: 'config-biometric',
        title: translateService.instant('BIOMETRIC.GLOBAL_MODAL.TITLE'),
        hasInLineLink: true,
        areButtonsWidthComplete: true,
        description: translateService.instant(
          'BIOMETRIC.GLOBAL_MODAL.DESCRIPTION'
        ),
        secondBtn: translateService.instant(
          'BIOMETRIC.GLOBAL_MODAL.SECOND_BUTTON'
        ),
        firstBtn: translateService.instant(
          'BIOMETRIC.GLOBAL_MODAL.FIRST_BUTTON'
        ),
        eventSecondBtn: modalBiometricSecondButton.bind(
          this,
          securityStorageService,
          modalService
        ),
        eventFirstBtn: modalBiometricFirstButton.bind(
          this,
          navCtrl,
          modalService
        )
      },
      'default-modal'
    )
    .then();
};

export const closeModalBiometric = (modalService: ModalService) =>
  modalService.close();
