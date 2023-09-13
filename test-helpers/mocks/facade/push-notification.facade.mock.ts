import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { IRegisterPush } from '@modules/push-notification/store/push.state';
import { initPushNotification } from '@modules/push-notification/store/reducers/push.reducer';

@Injectable()
export class PushNotificationFacadeMock extends MainContainerFacadeMock {
  public registerPush$: Observable<IRegisterPush> = new BehaviorSubject(
    initPushNotification
  );

  public filterProducts$(): Observable<any[]> {
    return new BehaviorSubject([]);
  }

  public fetchRegisterPush(): void {}
  public togglePush(): void {}
  public fetchDeletePush(): void {}
}
