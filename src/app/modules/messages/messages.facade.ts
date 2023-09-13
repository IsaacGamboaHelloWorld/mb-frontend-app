import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { IMessagesService } from '@modules/messages/entities/messages.entities';
import { messagesLoadAction } from '@modules/messages/store/actions/messages.action';
import { IAllMessageState } from '@modules/messages/store/messages.state';
import { messagesSelector } from '@modules/messages/store/messages.selector';
import { messagesDeleteLoadAction } from '@modules/messages/store/actions/messages-delete.action';
import { messagesReadLoadAction } from '@modules/messages/store/actions/messages-read.action';

@Injectable()
export class MessagesFacade extends MainContainerFacade {
  public messages$: Observable<IAllMessageState> = this.store.pipe(
    select(messagesSelector)
  );

  public fetchMessages(
    data: IMessagesService,
    showToast: boolean = false
  ): void {
    this.store.dispatch(messagesLoadAction(data, showToast));
  }

  public fetchDeleteMessages(messages: string[] = []): void {
    this.store.dispatch(messagesDeleteLoadAction({ idNotification: messages }));
  }

  public fetchReadMessage(id: string = ''): void {
    this.store.dispatch(messagesReadLoadAction({ idNotification: id }));
  }
}
