import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { IVoucher } from '@commons/entities/voucher.entities';

@Component({
  selector: 'velocity-voucher',
  templateUrl: './velocity-voucher.component.html',
  styleUrls: ['./velocity-voucher.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityVoucherComponent {
  @Input() config: IVoucher;
  constructor() {}

  get hasConfig(): boolean {
    return !!this.config;
  }

  get hasImage(): boolean {
    return !!this.config?.img;
  }

  get hasAmount(): boolean {
    return !!this.config?.amount;
  }

  get hasList(): boolean {
    return !!this.config?.list && this.config?.list.length > 0;
  }

  get hasDate(): boolean {
    return !!this.config?.date;
  }
}
