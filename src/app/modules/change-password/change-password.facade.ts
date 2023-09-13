import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { IChangePasswordState } from '@modules/change-password/store/change-password.state';
import { changePassword } from '@modules/change-password/store/change-password.selector';
import {
  changePasswordLoadAction,
  changePasswordResetAction,
  setLoadingChangePasswordAction
} from '@modules/change-password/store/change-password.action';
import { IChangePasswordService } from '@modules/change-password/entities/change-password.entities';

@Injectable()
export class ChangePasswordFacade extends MainContainerFacade {
  public changePassword$: Observable<IChangePasswordState> = this.store.pipe(
    select(changePassword)
  );

  public fetchChangePassword(form: IChangePasswordService): void {
    this.store.dispatch(changePasswordLoadAction(form));
  }

  public setLoadingChangePassword(): void {
    this.store.dispatch(setLoadingChangePasswordAction());
  }

  public resetChangePassword(): void {
    this.store.dispatch(changePasswordResetAction());
  }
}
