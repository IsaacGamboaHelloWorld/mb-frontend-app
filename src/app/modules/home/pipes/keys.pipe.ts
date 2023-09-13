import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    if (!!value) {
      return Object.keys(value).map((key) => ({ key, value: value[key] }));
    } else {
      return [];
    }
  }
}
