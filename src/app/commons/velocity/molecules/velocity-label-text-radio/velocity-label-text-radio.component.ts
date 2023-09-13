import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-label-text-radio',
  templateUrl: './velocity-label-text-radio.component.html',
  styleUrls: ['./velocity-label-text-radio.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityLabelTextRadioComponent {
  @Input() label: string;
  @Input() description: string;
  @Input() value: any;
  @Input() control: FormControl;

  public setValue(): void {
    this.control.setValue(this.value);
  }

  get addClass(): boolean {
    return JSON.stringify(this.value) === JSON.stringify(this.control?.value);
  }
}
