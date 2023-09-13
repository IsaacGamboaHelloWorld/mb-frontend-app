import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-card-lite-credit-card',
  templateUrl: './velocity-card-lite-credit-card.component.html',
  styleUrls: ['./velocity-card-lite-credit-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardLiteCreditCardComponent {
  @Input() title: string;
  @Input() img: string;
  @Input() type: string;
  @Input() number: string;
  @Input() titleAmount: string;
  @Input() amount: string;
  @Input() control: FormControl;
  @Input() value: any;
  @Input() blocks: number = 3;
  @Input() point: string = '•';

  public setValue(): void {
    !!this.control && this.control.setValue(this.value);
  }

  get hasControl(): boolean {
    return !!this.control;
  }
}
