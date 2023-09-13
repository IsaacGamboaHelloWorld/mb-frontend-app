import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-value-loan',
  templateUrl: './velocity-value-loan.component.html',
  styleUrls: ['./velocity-value-loan.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityValueLoanComponent implements OnInit {
  @Input() title: string;
  @Input() valueCurrency: string;
  @Input() value: any;
  @Input() placeholder: string = '';
  @Input() control: FormControl;

  ngOnInit(): void {
    if (this.addClass && !!this.control) {
      this.setValue();
    }
  }

  get hasValue(): boolean {
    return !!this.valueCurrency;
  }

  get addClass(): boolean {
    return this.value === this.control?.value;
  }

  public setValue(): void {
    this.control.setValue(this.value);
  }
}
