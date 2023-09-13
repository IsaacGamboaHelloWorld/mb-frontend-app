import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VALIDATOR_MESSAGES } from '@modules/forms/constants/validator.constant';

@Component({
  selector: 'app-velocity-custom-validator-message',
  templateUrl: './velocity-custom-validator-message.component.html',
  styleUrls: ['./velocity-custom-validator-message.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityCustomValidatorMessageComponent {
  @Input() control: FormControl;
  @Input() validatorName: string;
  @Input() isRequired: boolean = true;

  constructor() {}

  get textError(): string {
    return VALIDATOR_MESSAGES[this.validatorName];
  }

  get icon(): string {
    return this._validateStatus(
      'icon-vel-essential-info-3',
      'icon-vel-essential-check-26',
      'icon-vel-essential-delete-2'
    );
  }

  get color(): string {
    return this._validateStatus(
      'default-custom-validator',
      'success-custom-validator',
      'error-custom-validator'
    );
  }

  private _validateStatus(
    defaultStatus: string,
    success: string,
    error: string
  ): string {
    if (this.control?.dirty || this.control?.touched) {
      const errors = Object.keys(this.control.errors || {});
      return errors.some(
        (item) =>
          item === this.validatorName ||
          item === (this.isRequired ? 'required' : '')
      )
        ? error
        : success;
    } else {
      return defaultStatus;
    }
  }
}
