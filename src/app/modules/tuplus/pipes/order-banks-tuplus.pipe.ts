import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_BANKS_TUPLUS_POINTS } from '@modules/tuplus/constants/banks-information';

@Pipe({
  name: 'orderBanksTuplus'
})
export class OrderBanksTuplusPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    if (!!value) {
      return value
        .filter((item) => ORDER_BANKS_TUPLUS_POINTS.indexOf(item.key) !== -1)
        .sort(
          (a, b) =>
            ORDER_BANKS_TUPLUS_POINTS.indexOf(a.key) -
            ORDER_BANKS_TUPLUS_POINTS.indexOf(b.key)
        )
        .concat(
          value.filter(
            (item) => ORDER_BANKS_TUPLUS_POINTS.indexOf(item.key) === -1
          )
        );
    } else {
      return [];
    }
  }
}
