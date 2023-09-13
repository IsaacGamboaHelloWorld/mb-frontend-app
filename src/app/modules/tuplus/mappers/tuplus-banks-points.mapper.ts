import { TranslateService } from '@ngx-translate/core';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { DecimalPipe } from '@angular/common';

const decimalPipe = new DecimalPipe('en-US');
export const tuplusBanksPointsMapper = (
  bank: string,
  points: number,
  translate: TranslateService,
  imageCdn: ImageCdnPipe
): ItuplusBankPoints => ({
  bank,
  nameBank: translate.instant('BANKS.' + bank),
  img: imageCdn.transform('/' + bank.toLowerCase() + '.svg'),
  points: decimalPipe.transform(points)?.replace(/,/g, '.')
});

export const converToDecimal = (number): string =>
  decimalPipe.transform(number)?.replace(/,/g, '.');

export interface ItuplusBankPoints {
  bank: string;
  nameBank: string;
  img: string;
  points: string;
}
