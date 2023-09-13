import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ITypeBank } from '@commons/entities/type-bank.entities';

@Component({
  selector: 'velocity-type-bank',
  templateUrl: './velocity-type-bank.component.html',
  styleUrls: ['./velocity-type-bank.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityTypeBankComponent {
  @Input() info: ITypeBank;
  @Input() value: any;
  @Input() control: FormControl;

  public setValue(): void {
    this.control.setValue(this.value);
  }

  get hasInfo(): boolean {
    return !!this.info;
  }

  get addClass(): boolean {
    return this.control?.value === this.value;
  }
}
