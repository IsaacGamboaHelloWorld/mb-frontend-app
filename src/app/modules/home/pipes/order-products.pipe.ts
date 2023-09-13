import { Pipe, PipeTransform } from '@angular/core';

import { ORDER_PRODUCTS } from '@commons/constants/order_products';

@Pipe({
  name: 'orderProducts'
})
export class OrderProductsPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    if (!!value) {
      return value
        .filter((item) => ORDER_PRODUCTS.indexOf(item.key) !== -1)
        .sort(
          (a, b) =>
            ORDER_PRODUCTS.indexOf(a.key) - ORDER_PRODUCTS.indexOf(b.key)
        )
        .concat(
          value.filter((item) => ORDER_PRODUCTS.indexOf(item.key) === -1)
        );
    } else {
      return [];
    }
  }
}
