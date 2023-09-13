import { IDeletePocketRequest } from '@modules/pockets/entities/pockets.entities';
import { IPocket } from '@commons/entities/pockets.entities';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';

export const deletePocketServiceMapper = (
  pocket: IPocket,
  basicProduct: IProductBasic
): IDeletePocketRequest => {
  return {
    pocketId: pocket.pocketId,
    pocketType: pocket.pocketType,
    parentAccountId: basicProduct.id,
    parentAccountType: basicProduct.type.toUpperCase()
  };
};
