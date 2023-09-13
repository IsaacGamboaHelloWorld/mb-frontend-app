import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe extends CurrencyPipe implements PipeTransform {
  // @ts-ignore
  transform(value: any, smallDecimal: boolean = false): string {
    if (!isNullOrUndefined(value) && value !== '') {
      const transformed = super
        .transform(value)
        .replace(/[\.,]/g, (n) => (n === '.' ? ',' : '.'));

      return isDecimal(transformed, smallDecimal);
    } else {
      return value;
    }
  }
}

function isDecimal(value: string, decimal: boolean): string {
  if (decimal) {
    const newCurrency = value.split(',');
    return (
      newCurrency[0] + `<span class="decimal-numbers">,${newCurrency[1]}</span>`
    );
  } else {
    return value;
  }
}
