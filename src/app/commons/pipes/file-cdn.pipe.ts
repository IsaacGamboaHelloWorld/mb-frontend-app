import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileCdn'
})
export class FileCdnPipe implements PipeTransform {
  transform(value: string): string {
    return !!value ? `/assets/files${value}` : value;
  }
}
