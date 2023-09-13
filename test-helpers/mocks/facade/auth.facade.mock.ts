import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  IEnrollmentState,
  initialEnrollmentState
} from '@modules/auth/store/auth.state';
import { AppFacadeMock } from '@test-helpers/mocks/facade/app.facade.mock';

@Injectable()
export class AuthFacadeMock extends AppFacadeMock {
  public contentEnrollment$: Observable<IEnrollmentState> = new BehaviorSubject(
    initialEnrollmentState
  );

  public fetchStartAuth(): void {}

  public resetAuth(): void {}

  public setLoadingAuth(): void {}

  public changeStatus(): void {}

  public setIsLogged(): void {}

  public setAuthData(): void {}

  public setErrorAuth(): void {}
}
