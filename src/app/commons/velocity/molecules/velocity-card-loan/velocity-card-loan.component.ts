import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-card-loan',
  templateUrl: './velocity-card-loan.component.html',
  styleUrls: ['./velocity-card-loan.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardLoanComponent {
  @Input() bank: string;
  @Input() nameClass: string = '';
  @Input() isImg: boolean = false;
  @Input() img: string;
  @Input() id: string;
  @Input() type: string;
  @Input() value: any;
  @Input() control: FormControl;

  public setValue(): void {
    this.control.setValue(this.value);
  }
}
