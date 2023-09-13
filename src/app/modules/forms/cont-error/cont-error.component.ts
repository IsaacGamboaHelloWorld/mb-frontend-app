import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VALIDATOR_MESSAGES } from '@modules/forms/constants/validator.constant';

@Component({
  selector: 'app-cont-error',
  templateUrl: './cont-error.component.html',
  styleUrls: ['./cont-error.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ContErrorComponent {
  @Input() control: FormControl;
  @Input() validateDirty?: boolean = true;

  constructor() {}

  get hasControl(): boolean {
    return !!this.control;
  }

  get isErrorMessage(): boolean {
    const state: boolean = this.validateDirty
      ? this.control.dirty || this.control.touched
      : true;
    return (
      this.control.invalid &&
      state &&
      this.control.errors !== null &&
      Object.keys(this.control.errors).length > 0 &&
      !this.control.pending
    );
  }

  get textError(): string {
    const error = Object.keys(this.control.errors);
    return VALIDATOR_MESSAGES[error[0]];
  }
}
