import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { initGreeting } from '@commons/helpers/greetings.helper';
import { TranslateService } from '@ngx-translate/core';
import { SPECIAL_DATES } from '@app/commons/constants/special-dates';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() type: string;
  @Input() showBack: boolean = false;
  @Input() showBorder: boolean = false;
  @Input() showMessages: boolean = false;
  @Input() text: string;
  @Input() iconLeft: string;
  @Input() iconRight: string;
  @Input() showMenu: boolean = true;
  @Input() showGreeting: boolean = true;
  @Output() btnRight: EventEmitter<void> = new EventEmitter<void>();
  @Output() btnLeft: EventEmitter<void> = new EventEmitter<void>();
  @Output() btnMessages: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private translateService: TranslateService,
    private menuCtrl: MenuController
  ) {}

  get greeting(): string {
    return initGreeting(
      this.translateService.instant('GREETINGS.MORNING'),
      this.translateService.instant('GREETINGS.AFTERNOON'),
      this.translateService.instant('GREETINGS.NIGHT'),
      this.translateService.instant('GREETINGS.BIRTHDAY'),
      SPECIAL_DATES,
      this.translateService
    );
  }

  get newText(): string {
    return !!this.text ? this.text : this.showGreeting ? this.greeting : '';
  }

  get hasIconLeft(): boolean {
    return !!this.iconLeft;
  }

  get isTypeThreeOrFour(): boolean {
    return this.type === 'type-three' || this.type === 'type-four';
  }

  public toggleMenu(): void {
    this.menuCtrl.toggle();
  }
}
