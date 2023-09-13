import { FormControl, Validators } from '@angular/forms';

export function typeReferenceValidator(
  control: FormControl
): { [key: string]: boolean } {
  if (!!control && !!this.formToWhoPayment) {
    if (control.value === 1) {
      this.payrollNumber.setValidators([Validators.required]);
      this.documentId.clearValidators();
      this.documentId.reset();
      this.month.clearValidators();
      this.month.setValue(this.months[0]);
      this.year.clearValidators();
      this.year.reset();
    } else if (control.value === 2) {
      this.documentId.setValidators([Validators.required]);
      this.month.setValidators([Validators.required]);
      this.year.setValidators([Validators.required]);
      this.payrollNumber.clearValidators();
      this.payrollNumber.reset();
    } else {
      return null;
    }
    this.documentId.updateValueAndValidity();
    this.month.updateValueAndValidity();
    this.year.updateValueAndValidity();
    this.payrollNumber.updateValueAndValidity();
  }
  return null;
}
