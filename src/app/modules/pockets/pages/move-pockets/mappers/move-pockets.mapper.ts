import { IMovePocketRequest } from '@modules/pockets/entities/pockets.entities';
import { IPocket } from '@commons/entities/pockets.entities';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { FormGroup } from '@angular/forms';

export const movePocketServiceMapper = (
  pocket: IPocket,
  basicProduct: IProductBasic,
  form: FormGroup
): IMovePocketRequest => {
  switch (form?.value?.where) {
    case 1:
      return {
        parentAccountId: basicProduct.id,
        parentAccountType: basicProduct.type.toUpperCase(),
        pocketIdFrom: basicProduct.id,
        pocketTypeFrom: basicProduct.type.toUpperCase(),
        pocketIdTo: pocket.pocketId,
        pocketTypeTo: pocket.pocketType.toUpperCase(),
        amount: form.controls.amountToMove.currencyValue()
      };
    case 2:
      return {
        parentAccountId: basicProduct.id,
        parentAccountType: basicProduct.type.toUpperCase(),
        pocketIdFrom: pocket.pocketId,
        pocketTypeFrom: pocket.pocketType.toUpperCase(),
        pocketIdTo: form?.controls?.pocketTo?.value?.pocketId,
        pocketTypeTo: form?.controls?.pocketTo?.value?.pocketType.toUpperCase(),
        amount: form.controls.amountToMove.currencyValue()
      };
    case 3:
      return {
        parentAccountId: basicProduct.id,
        parentAccountType: basicProduct.type.toUpperCase(),
        pocketIdFrom: pocket.pocketId,
        pocketTypeFrom: pocket.pocketType.toUpperCase(),
        pocketIdTo: basicProduct.id,
        pocketTypeTo: basicProduct.type.toUpperCase(),
        amount: form.controls.amountToMove.currencyValue()
      };
  }
};
