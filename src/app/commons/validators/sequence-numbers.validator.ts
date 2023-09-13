import { ValidatorFn, AbstractControl } from '@angular/forms';

export function ValidateSequenceNumbers(seqLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) return null;

    let result = false;
    const controlValue = control.value.toString();
    const seq = '0123456789';
    const seqReverse = seq
      .split('')
      .reverse()
      .join('');

    for (let i = 0; i <= controlValue.length - seqLength; i++) {
      const substr = controlValue.substring(i, i + seqLength);
      if (seq.includes(substr) || seqReverse.includes(substr)) {
        result = true;
        break;
      }
    }
    return result ? { sequenceNumbers: true } : null;
  };
}
