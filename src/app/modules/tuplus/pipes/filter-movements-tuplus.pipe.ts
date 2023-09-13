import { Pipe, PipeTransform } from '@angular/core';
import { calculateDate } from '@commons/helpers/global.helper';

@Pipe({
  name: 'filterDateMovementsTuplus'
})
export class FilterMovementsTuplusPipe implements PipeTransform {
  transform(
    value: any[],
    text: 'day' | 'week' | 'month' | '',
    property: string
  ): any[] {
    if (text === '') {
      return value;
    } else {
      let paramDate = '';

      switch (text) {
        case 'day':
          paramDate = calculateDate('getDate', 'setDate');
          break;
        case 'week':
          paramDate = calculateDate('getDate', 'setDate', 7);
          break;
        case 'month':
          paramDate = calculateDate('getMonth', 'setMonth');
          break;
      }

      return value.filter((movement) => {
        return (
          new Date(movement[property]).getTime() >=
          new Date(paramDate).getTime()
        );
      });
    }
  }
}
