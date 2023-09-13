import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { zip } from 'rxjs';

import { IMessage } from '@modules/messages/entities/messages.entities';
import { MESSAGES } from '@commons/constants/navigatie-global';
import { MessageAbstract } from '@modules/messages/utils/message.abstract';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DetailMessageComponent extends MessageAbstract {
  public message: IMessage;
  constructor(protected injector: Injector) {
    super(injector);
  }

  get messageUrl(): string {
    return MESSAGES;
  }

  ionViewWillEnter(): void {
    zip(this.facade.routerParams$, this.facade.messages$)
      .pipe(
        map(([url, messagesAll]) =>
          messagesAll.messages?.find((message) => message.id === url?.id)
        ),
        first()
      )
      .subscribe((message) => (this.message = message));
  }

  public deleteMessage(): void {
    this.modalService.close();
    this.facade.fetchDeleteMessages([this.message?.id || '']);
    this.back(this.messageUrl);
  }
}
