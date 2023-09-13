import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-operator',
  templateUrl: './velocity-operator.component.html',
  styleUrls: ['./velocity-operator.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityOperatorComponent {
  @Input() img: string;
  @Input() name: string;
  @Input() value: any;
  @Input() id: string = '';
  @Input() control: FormControl;
  @Input() icon: string = '';
  @Input() showImage: boolean = true;
  @Input() hasIcon: boolean = false;

  get addClass(): boolean {
    return !!this.control && this.control?.value === this.value;
  }

  public setValue(): void {
    !!this.control && this.control.setValue(this.value);
  }
}
