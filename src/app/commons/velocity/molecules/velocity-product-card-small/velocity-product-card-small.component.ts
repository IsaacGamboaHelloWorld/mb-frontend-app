import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProductCardSmall } from '@commons/entities/products.entities';

@Component({
  selector: 'velocity-product-card-small',
  templateUrl: './velocity-product-card-small.component.html',
  styleUrls: ['./velocity-product-card-small.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityProductCardSmallComponent {
  @Input() info: IProductCardSmall;
  @Input() value: any;
  @Input() control: FormControl;
  @Input() id: string;

  public setValue(): void {
    !!this.control && this.control.setValue(this.value);
  }

  get hasInfo(): boolean {
    return !!this.info;
  }

  get hasImg(): boolean {
    return !!this.info?.img;
  }

  get hasIcon(): boolean {
    return !!this.info?.icon;
  }

  get addClass(): boolean {
    return !!this.control && this.control?.value === this.value;
  }
}
