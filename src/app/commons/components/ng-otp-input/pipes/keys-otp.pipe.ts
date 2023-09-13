import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysOtp'
})
export class KeysOtpPipe implements PipeTransform {
  transform(value: any): string[] {
    return Object.keys(value);
  }
}
