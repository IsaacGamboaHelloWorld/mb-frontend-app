import { NavController } from '@ionic/angular';

import { EXPERIENCE, HOME } from '@commons/constants/navigatie-global';
import { IExperienceResponse } from '@modules/experience/entities/experience.entities';
import { ExperienceFacade } from '@modules/experience/experience.facade';
import { StepExperienceType } from '@modules/experience/constants/steps';
import { IExperienceState } from '@modules/experience/store/experience.state';

export function redirectExperience(
  content: IExperienceResponse,
  navController: NavController,
  facade: ExperienceFacade
): void {
  if (
    content.success &&
    content.step !== StepExperienceType.INIT_PIN_OTP_FLOW
  ) {
    navController.navigateRoot([EXPERIENCE]);
  } else if (
    !isOnServiceErrorOrAnAllowedErrorStep(content) &&
    !content?.success
  ) {
    facade.openToast(
      !!content.additionalErrorMessage
        ? content.additionalErrorMessage
        : content.errorMessage
    );
  }
}

export function isOnServiceErrorOrAnAllowedErrorStep(
  content: IExperienceResponse
): boolean {
  return (
    StepExperienceType.RETRIES_LIMIT_EXCEED_ON_LOAD_ENROLLMENT_OTP ===
      content.step ||
    StepExperienceType.DOESNT_HAVE_PIN_DEBIT_CARD_ENABLE === content.step ||
    StepExperienceType.RETRIES_LIMIT_EXCEED_ON_FILL_SECURITY_QUESTION ===
      content.step
  );
}

export async function validateExperience(
  facade: ExperienceFacade,
  info: IExperienceState,
  navCtrl: NavController
): Promise<void> {
  const { content } = info;
  if (content.step === StepExperienceType.INIT_PIN_OTP_FLOW) {
    navCtrl.navigateRoot([EXPERIENCE]);
  }
}
