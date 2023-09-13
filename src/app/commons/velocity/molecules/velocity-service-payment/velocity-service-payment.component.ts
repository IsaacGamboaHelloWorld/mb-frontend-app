import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-service-payment',
  templateUrl: './velocity-service-payment.component.html',
  styleUrls: ['./velocity-service-payment.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityServicePaymentComponent implements OnInit {
  constructor() {}
  @Input() title: string;
  @Input() name: string;
  @Input() description: string;
  @Input() value: any;
  @Input() date: string;
  @Input() control: FormControl;

  ngOnInit(): void {
    if (this.addClass && !!this.control) {
      this.setValue();
    }
  }

  public setValue(): void {
    this.control.setValue(this.value);
  }

  get addClass(): boolean {
    return JSON.stringify(this.value) === JSON.stringify(this.control?.value);
  }

  get hasInfo(): boolean {
    return !!this.value;
  }

  get hasDate(): boolean {
    return !!this.date;
  }
}
