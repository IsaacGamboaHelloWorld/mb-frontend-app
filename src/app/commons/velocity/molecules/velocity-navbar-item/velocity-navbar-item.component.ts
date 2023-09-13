import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { ItemNavBar } from '@modules/main-container/entities/user.entities';

@Component({
  selector: 'velocity-navbar-item',
  templateUrl: './velocity-navbar-item.component.html',
  styleUrls: ['./velocity-navbar-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityNavbarItemComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() state: boolean = false;
  @Input() enable: boolean = false;
  @Input() hasAmount: boolean = false;
  @Input() hasProducts: boolean = false;
  @Input() hasPermissions: boolean = false;
  @Input() navigateTo: string[] = [''];
  @Input() textTagNewProduct: string = '';
  @Output() actionClick: EventEmitter<ItemNavBar> = new EventEmitter<
    ItemNavBar
  >();

  public redirect(): void {
    this.actionClick.emit({
      enable: this.enable,
      hasProducts: this.hasProducts,
      navigateTo: this.navigateTo,
      hasAmount: this.hasAmount,
      hasPermissions: this.hasPermissions
    });
  }
}
