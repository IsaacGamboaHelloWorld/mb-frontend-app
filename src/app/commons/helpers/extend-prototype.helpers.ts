import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

declare module '@angular/forms' {
  interface FormControl {
    currencyValue(): number;

    normalize(): string;
  }

  interface AbstractControl {
    currencyValue(): number;

    normalize(): string;
  }
}

declare module 'rxjs' {
  interface Observable<T> {
    filterUndefined: () => Observable<T>;
    currentValue: () => any;
  }
}

declare global {
  interface FormControl {
    currencyValue(): number;
    normalize(): string;
  }

  interface AbstractControl {
    currencyValue(): number;
    normalize(): string;
  }

  interface Observable<T> {
    currentValue: () => any;
  }
}

FormControl.prototype.currencyValue = function(this: FormControl): number {
  return !isNullOrUndefined(this.value) &&
    this.value.toString().trim().length > 0
    ? Number((this.value + '').replace(/[^0-9,]+/g, '').replace(',', '.'))
    : null;
};

FormControl.prototype.normalize = function(this: FormControl): string {
  return !isNullOrUndefined(this.value) &&
    this.value.toString().trim().length > 0
    ? (this.value + '').replace(/\s/g, '')
    : null;
};

AbstractControl.prototype.currencyValue = function(
  this: AbstractControl
): number {
  return !isNullOrUndefined(this.value) &&
    this.value.toString().trim().length > 0
    ? +(this.value + '').replace(/[^0-9,]+/g, '').replace(',', '.')
    : null;
};

FormControl.prototype.normalize = function(this: FormControl): string {
  return !isNullOrUndefined(this.value) &&
    this.value.toString().trim().length > 0
    ? (this.value + '').replace(/\s/g, '')
    : null;
};

Observable.prototype.currentValue = function(): any {
  let value;
  this.subscribe((_value) => (value = _value)).unsubscribe();
  return value;
};
