import { IEditPocketRequest } from '@modules/pockets/entities/pockets.entities';
import { IPocket } from '@commons/entities/pockets.entities';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { FormGroup } from '@angular/forms';

export const editPocketServiceMapper = (
  pocket: IPocket,
  basicProduct: IProductBasic,
  form: FormGroup
): IEditPocketRequest => {
  return {
    category: form.value.pocketType,
    parentAccountId: basicProduct.id,
    parentAccountType: basicProduct.type.toUpperCase(),
    periodicAmount: form.controls.periodicAmount.currencyValue(),
    pocketId: pocket.pocketId,
    pocketName: form.value.name,
    pocketPeriod: form.value.periodicity,
    pocketType: pocket.pocketType,
    savingAmount: form.controls.amount.currencyValue()
  };
};
