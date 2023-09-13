import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IChangePasswordState } from '@modules/change-password/store/change-password.state';
import { initChangePassword } from '@modules/change-password/store/change-password.reducer';

@Injectable()
export class ChangePasswordFacadeMock {
  public changePassword$: Observable<
    IChangePasswordState
  > = new BehaviorSubject(initChangePassword);

  public fetchChangePassword(): void {}
  public setLoadingChangePassword(): void {}
  public resetChangePassword(): void {}
}
