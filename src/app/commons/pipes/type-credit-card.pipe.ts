import { Pipe, PipeTransform } from '@angular/core';

import {
  maskCreditCardHelper,
  spaceCreditCardHelper
} from '@commons/helpers/mask-credit-card.helper';
import { CREDIT_CARD } from '@commons/constants/credit-card';
import { cardTypeClassMapper } from '@commons/mappers/card-type-class.mapper';

const TYPE_VISA: object = new RegExp('^4d{0,15}');
const MASTER_CARD: object = new RegExp(
  '^(5[1-5]d{0,2}|22[2-9]d{0,1}|2[3-7]d{0,2})d{0,12}'
);

interface ITypeCreditCard {
  name: string;
  maskId: string;
  spaceId: string;
  img: string;
  imgBig: string;
  icon: string;
  typeClass: string;
}

const DEFAULT_CARD: ITypeCreditCard = {
  maskId: '',
  spaceId: '',
  icon: '',
  ...CREDIT_CARD.DEFAULT
};

const validateCard = (value: string, regExp: any): boolean => {
  return !!value?.toString()?.match(regExp);
};

@Pipe({
  name: 'typeCreditCard'
})
export class TypeCreditCardPipe implements PipeTransform {
  transform(value: any, args?: any): ITypeCreditCard {
    const ID = {
      maskId: maskCreditCardHelper(spaceCreditCardHelper(value)),
      spaceId: spaceCreditCardHelper(value),
      typeClass: cardTypeClassMapper(value)
    };

    if (!!value) {
      if (validateCard(value, TYPE_VISA)) {
        return {
          ...CREDIT_CARD.VISA,
          ...ID
        };
      }

      if (validateCard(value, MASTER_CARD)) {
        return {
          ...CREDIT_CARD.MASTER_CARD,
          ...ID
        };
      }

      return DEFAULT_CARD;
    }

    return DEFAULT_CARD;
  }
}
