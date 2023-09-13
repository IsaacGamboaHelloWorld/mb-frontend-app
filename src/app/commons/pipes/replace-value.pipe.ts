import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplaceValuePipe implements PipeTransform {
  transform(value: any, search: string = '', replace: string = ''): any {
    return !!value ? value.replace(search, replace) : '';
  }
}
