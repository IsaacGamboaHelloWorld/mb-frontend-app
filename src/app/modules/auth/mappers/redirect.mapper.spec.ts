import {
  redirectEnrollment,
  redirectHome
} from '@modules/auth/mappers/redirect.mapper';
import { IEnrollmentResponse } from '@modules/auth/entities/auth.interface';
import { StepEnrollmentType } from '@modules/auth/constants/step';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { IEnrollmentState } from '@modules/auth/store/auth.state';
import { AdlSecureStorageService } from '@app/commons/services/adl-security-storage.service';
import { AuthServiceMock } from '@test-helpers/mocks/facade/authService.mock';

const facade = new AuthFacadeMock();

const router = {
  navigate: () => {}
};
const navCtrl = {
  navigateRoot: () => {}
};

const authService = {
  saveTokenData: () => {},
  hasTokenData: () => new Promise((resolve) => resolve(true))
};

const modalService = {
  openModal: () => {},
  close: () => {}
};

const auth = new AuthServiceMock();

const storage = new AdlSecureStorageService();

const translateService = {
  instant: () => {}
};

describe('RedirectHelper', () => {
  it('should redirect enrollment', () => {
    const data: IEnrollmentResponse = {
      step: StepEnrollmentType.FILL_UNIVERSAL_PASSWORD,
      success: true,
      additionalErrorMessage: 'test',
      errorMessage: null
    };
    redirectEnrollment(
      data,
      navCtrl as any,
      facade as any,
      translateService as any,
      modalService as any
    );
    data.step = StepEnrollmentType.SERVICE_ERROR;
    data.success = false;
    redirectEnrollment(
      data,
      navCtrl as any,
      facade as any,
      translateService as any,
      modalService as any
    );
    data.additionalErrorMessage = null;
    data.errorMessage = 'ert';
    redirectEnrollment(
      data,
      navCtrl as any,
      facade as any,
      translateService as any,
      modalService as any
    );
    expect(data).toBeDefined();
  });

  it('should redirect home', () => {
    const data: IEnrollmentState = {
      content: {
        step: StepEnrollmentType.COMPLETED,
        success: true,
        token: ''
      },
      information: null,
      loading: false,
      error: false,
      completed: false,
      message: ''
    };
    redirectHome(
      facade as any,
      data,
      authService as any,
      navCtrl as any,
      storage,
      auth as any,
      translateService as any,
      modalService as any
    );
    data.content.step = StepEnrollmentType.INIT;
    redirectHome(
      facade as any,
      data,
      authService as any,
      navCtrl as any,
      storage,
      auth as any,
      translateService as any,
      modalService as any
    );
    expect(data).toBeDefined();
  });
});
