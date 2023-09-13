import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { IMessage } from '@modules/messages/entities/messages.entities';
import { HOME, MESSAGE } from '@commons/constants/navigatie-global';
import { IAllMessageState } from '@modules/messages/store/messages.state';
import { trackBy } from '@app/commons/helpers/trackBy.helper';
import { MessageAbstract } from '@modules/messages/utils/message.abstract';
import { KEYS } from '@commons/constants/global';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesPage extends MessageAbstract {
  public loading: number = 4;
  public showCheck: boolean = false;
  public checkAll: boolean = false;
  private deleteMessages: string[] = [];
  private key: string;
  constructor(protected injector: Injector) {
    super(injector);
    this.secureStorage.get(KEYS.DEVICE_ID).then((key) => {
      this.key = key;
      this.facade.fetchMessages({ serial: key }, true);
    });
  }

  get messages$(): Observable<IAllMessageState> {
    return this.facade.messages$.pipe(
      map((data) => {
        const messages = data.messages
          .slice()
          .sort(
            (a, b) =>
              new Date(b.startDt).getTime() - new Date(a.startDt).getTime()
          );
        return {
          ...data,
          messages
        };
      })
    );
  }

  get home(): string {
    return HOME;
  }

  get hasDeleteMessage(): boolean {
    return this.deleteMessages.length > 0;
  }

  get hasMessages$(): Observable<boolean> {
    return this.messages$.pipe(map((data) => data?.messages?.length > 0));
  }

  public shortContent(content: string): string {
    return content.length > 70 ? `${content.substr(0, 70)}...` : content;
  }

  public showMessage(message: IMessage): void {
    !this.showCheck && this.facade.fetchReadMessage(message?.id);
    !this.showCheck &&
      this.navCtrl.navigateForward([`${MESSAGE}/${message?.id}`]);
  }

  public loadMessages(): void {
    this.facade.fetchMessages({ serial: this.key }, true);
  }

  public trackBy(index: number, product: IMessage): string {
    return trackBy(product, product.id);
  }

  public toggleChecks(): void {
    this.showCheck = !this.showCheck;
    !this.showCheck && this._resetArrayMessages();
    !this.showCheck && (this.checkAll = false);
  }

  public customMessages({ id, check }: { id: string; check: boolean }): void {
    this.deleteMessages = check
      ? [...this.deleteMessages, id]
      : this.deleteMessages.filter((data) => data !== id);
  }

  public toggleSelectedAll(): void {
    this.checkAll = !this.checkAll;
    this.checkAll &&
      this.messages$
        .pipe(
          first(),
          map((data) => data.messages.map((message) => message.id))
        )
        .subscribe((data) => (this.deleteMessages = data));
    !this.checkAll && this._resetArrayMessages();
  }

  public fetchDeleteMessages(): void {
    this.modalService.close();
    this.facade.fetchDeleteMessages(this.deleteMessages);
    this.toggleChecks();
  }

  private _resetArrayMessages(): void {
    this.deleteMessages = [];
  }
}
