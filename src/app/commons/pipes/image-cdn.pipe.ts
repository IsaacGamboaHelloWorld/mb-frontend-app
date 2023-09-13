import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageCdn'
})
export class ImageCdnPipe implements PipeTransform {
  transform(value: string): string {
    return !!value ? `/assets/images${value}` : value;
  }
}
