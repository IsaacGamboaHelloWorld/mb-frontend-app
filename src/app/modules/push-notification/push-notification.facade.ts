import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import * as actions from '@modules/push-notification/store/push.action';
import { IRegisterPushBody } from '@modules/push-notification/entities/push-notification.entities';
import { IRegisterPush } from '@modules/push-notification/store/push.state';
import { registerPushSelector } from '@modules/push-notification/store/push.selector';

export class PushNotificationFacade extends MainContainerFacade {
  public registerPush$: Observable<IRegisterPush> = this.store.pipe(
    select(registerPushSelector)
  );

  public togglePush(enable: boolean): void {
    this.store.dispatch(actions.togglePushNotificationAction(enable));
  }

  public fetchRegisterPush(body: IRegisterPushBody): void {
    this.store.dispatch(actions.registerPushNotificationLoadAction(body));
  }

  public fetchDeletePush(): void {
    this.store.dispatch(actions.deletePushNotificationLoadAction());
  }
}
