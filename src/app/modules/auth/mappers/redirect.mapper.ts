import {
  IEnrollmentResponse,
  InitAuth
} from '@modules/auth/entities/auth.interface';
import { NavController } from '@ionic/angular';

import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { ENROLLMENT, HOME, LOGIN } from '@commons/constants/navigatie-global';
import { AuthFacade } from '@modules/auth/auth.facade';
import { StepEnrollmentType } from '@modules/auth/constants/step';
import { IEnrollmentState } from '@modules/auth/store/auth.state';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { IAuthData } from '@commons/entities/auth-data.entities';
import { AuthService } from '@commons/services/auth/auth.service';
import { environment } from '@environment/environment';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@commons/services/modal.service';
import { openModalBiometric } from '@commons/helpers/modal-biometric.helper';
import {
  GROUP_MEMO_GLOBAL,
  memoClosureGlobal
} from '@commons/memorize/global.memorize';
import { trackLinks } from '@commons/helpers/trackEvents.helper';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { Storage } from '@capacitor/storage';

export function redirectEnrollment(
  content: IEnrollmentResponse,
  navController: NavController,
  facade: AuthFacade,
  translate: TranslateService,
  modalService: ModalService
): void {
  if (
    content.success &&
    content.step !== StepEnrollmentType.INIT &&
    content.step !== StepEnrollmentType.USER_DOES_NOT_EXISTS
  ) {
    navController.navigateRoot([ENROLLMENT]);
  } else if (
    !isOnServiceErrorOrAnAllowedErrorStep(content) &&
    !content?.success
  ) {
    facade.openToast(
      !!content.additionalErrorMessage
        ? content.additionalErrorMessage
        : content.errorMessage
    );
  } else if (
    StepEnrollmentType.USER_DOES_NOT_EXISTS === content.step &&
    content?.success
  ) {
    facade.openToast(translate.instant('AUTH.USER_DOES_NOT_EXISTS'));
  } else if (isOverflowStep(content) && content.success) {
    openOverflowModal(content.step, modalService, navController, translate);
  }
}

export function isOnServiceErrorOrAnAllowedErrorStep(
  content: IEnrollmentResponse
): boolean {
  return (
    StepEnrollmentType.USER_DOES_NOT_EXISTS === content.step ||
    StepEnrollmentType.DOES_NOT_EXISTS === content.step ||
    StepEnrollmentType.LIMIT_EXCEED_ON_OTP_GENERATION === content.step ||
    StepEnrollmentType.LIMIT_EXCEED_ON_SECURE_DATA_GENERATION ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_CREATE_OR_MIGRATE_USER_CREDENTIALS ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_FILL_CREDENTIALS ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_FILL_SECURITY_QUESTION ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_LOAD_ENROLLMENT_OTP ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_USER_TASK === content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_FILL_ENROLLMENT_OTP ===
      content.step
  );
}

export function isOverflowStep(content: IEnrollmentResponse): boolean {
  return (
    StepEnrollmentType.LIMIT_EXCEED_ON_OTP_GENERATION === content.step ||
    StepEnrollmentType.LIMIT_EXCEED_ON_SECURE_DATA_GENERATION ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_CREATE_OR_MIGRATE_USER_CREDENTIALS ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_FILL_CREDENTIALS ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_FILL_SECURITY_QUESTION ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_LOAD_ENROLLMENT_OTP ===
      content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_USER_TASK === content.step ||
    StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_FILL_ENROLLMENT_OTP ===
      content.step
  );
}

const toggleRemember = (
  securityStorageService: AdlSecureStorageService,
  information: InitAuth
) => {
  securityStorageService.put(KEYS.REMEMBER, JSON.stringify(information), true);
};

const temporalPassword = async (
  securityStorageService: AdlSecureStorageService,
  authService: AuthService,
  info: InitAuth
): Promise<void> => {
  authService.setInfoUser = info;
  trackLinks({ tealium_event: 'login', id: info?.id, idType: info?.idType });
  try {
    if (memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true)) {
      await securityStorageService.put(
        KEYS.TEMPORAL_DATA,
        JSON.stringify({
          id: btoa(info?.id),
          idType: btoa(info?.idType),
          password: authService.temporalData
        })
      );
      authService.setData = null;
    }
  } catch {}
};

const temporalFingerprint = async (authService: AuthService): Promise<void> => {
  if (authService.temporalFingerprint && environment.removeKonyFingerprint) {
    try {
      await Storage.remove({ key: '_cap_SecDevFP' });
    } catch {}
    authService.temporalFingerprint = false;
  }
};

const authDataMapper = (content: IEnrollmentResponse): IAuthData => ({
  lastAuthDate: content?.lastAuthDate ? new Date(content?.lastAuthDate) : null,
  currentDate: content?.currentDate ? new Date(content?.currentDate) : null,
  processId: content?.processId,
  lastIPAddress: content?.lastIPAddress,
  complementary: !!content?.complementary,
  couldHaveComplementary: !!content?.couldHaveComplementary
});

export async function redirectHome(
  facade: AuthFacade,
  info: IEnrollmentState,
  authService: AuthSessionService,
  navCtrl: NavController,
  securityStorageService: AdlSecureStorageService,
  auth: AuthService,
  translate: TranslateService,
  modalService: ModalService
): Promise<void> {
  const { information, content } = info;
  if (content.step === StepEnrollmentType.COMPLETED) {
    toggleRemember(securityStorageService, information);
    await temporalPassword(securityStorageService, auth, information);
    await temporalFingerprint(auth);
    await authService.saveTokenData(content.token);
    facade.setIsLogged(true);
    facade.setAuthData(authDataMapper(content));
    validateModalBiometric(
      securityStorageService,
      content,
      translate,
      navCtrl,
      facade,
      modalService
    );
    navCtrl.navigateRoot([HOME], {
      animationDirection: 'forward'
    });
    !content?.complementary &&
      facade.openToast(translate.instant('AUTH.NOT_COMPLEMENTARY'), 'info');
  }
  if (
    content.step === StepEnrollmentType.INIT &&
    !(await authService.hasTokenData())
  ) {
    navCtrl.navigateRoot([LOGIN]);
  }
}

const validateModalBiometric = (
  securityStorageService: AdlSecureStorageService,
  content: IEnrollmentResponse,
  translate: TranslateService,
  navCtrl: NavController,
  facade: AuthFacade,
  modalService: ModalService
) => {
  Promise.all([
    securityStorageService.get(KEYS.BIOMETRIC),
    securityStorageService.get(KEYS.MODAL_BIOMETRIC)
  ])
    .then(([hasConfigBiometric, hasModalBiometric]) => {
      if (
        !memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true) ||
        hasConfigBiometric ||
        hasModalBiometric
      ) {
        openToast(content, translate, facade);
      } else {
        memoClosureGlobal(GROUP_MEMO_GLOBAL.HAS_BIOMETRIC, true) &&
          !hasConfigBiometric &&
          !hasModalBiometric &&
          openModalBiometric(
            modalService,
            securityStorageService,
            navCtrl,
            translate
          );
      }
    })
    .catch((_) => openToast(content, translate, facade));
};

const openToast = (
  content: IEnrollmentResponse,
  translate: TranslateService,
  facade: AuthFacade
) =>
  !content?.complementary &&
  facade.openToast(translate.instant('AUTH.NOT_COMPLEMENTARY'), 'info');

export const openOverflowModal = (
  step: string,
  modalService: ModalService,
  navCtrl: NavController,
  translateService: TranslateService
) => {
  modalService
    .openModal(
      ModalGenericComponent,
      {
        type: 'enrollment-overflow-step',
        icon: 'icon-vel-face-wrong',
        iconType: 'error',
        title: translateService.instant('AUTH.OVERFLOW_MODAL.TITLE'),
        description: translateService.instant(
          'AUTH.OVERFLOW_MODAL.DESCRIPTION'
        ),
        firstBtn: translateService.instant('AUTH.OVERFLOW_MODAL.BTN'),
        eventFirstBtn: overflowModalButton.bind(this, navCtrl, modalService)
      },
      'default-modal',
      false,
      true
    )
    .then();
};

export const overflowModalButton = (
  navCtrl: NavController,
  modalService: ModalService
) => {
  modalService.close();
  navCtrl.navigateRoot([LOGIN]);
};
