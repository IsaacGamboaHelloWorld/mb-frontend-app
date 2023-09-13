import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-withdrawal-place',
  templateUrl: './velocity-withdrawal-place.component.html',
  styleUrls: ['./velocity-withdrawal-place.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityWithdrawalPlaceComponent {
  @Input() icon: string;
  @Input() iconColor: 'success';
  @Input() align: 'center' | 'left';
  @Input() orientation: 'column' | 'row' = 'column';
  @Input() size: 'small';
  @Input() name: string;
  @Input() value: any;
  @Input() control: FormControl;
  @Input() disabled: boolean = false;

  get addClass(): boolean {
    return !!this.control && this.control?.value === this.value;
  }

  get hasControl(): boolean {
    return !!this.control;
  }

  get hasIcon(): boolean {
    return !!this.icon;
  }

  public setValue(): void {
    if (!!this.control && !this.disabled) this.control.setValue(this.value);
  }
}
