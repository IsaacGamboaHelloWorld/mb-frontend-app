import { Pipe, PipeTransform } from '@angular/core';

import { maskHideIdHelper } from '@commons/helpers/mask-hide-id.helper';

@Pipe({
  name: 'hideShowId'
})
export class HideShowIdPipe implements PipeTransform {
  transform(value: any): string {
    const maskId = maskHideIdHelper(maskHideIdHelper(value));

    return maskId;
  }
}
