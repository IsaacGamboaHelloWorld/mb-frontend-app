import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-label-radio',
  templateUrl: './velocity-label-radio.component.html',
  styleUrls: ['./velocity-label-radio.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityLabelRadioComponent {
  @Input() name: string;
  @Input() value: any;
  @Input() control: FormControl;

  get addClass(): boolean {
    return JSON.stringify(this.value) === JSON.stringify(this.control?.value);
  }

  public setValue(): void {
    this.control.setValue(this.value);
  }
}
