import { IBlockProductBody } from '@modules/block-product/entities/block.entities';
import { BANKS } from '@commons/constants/banks';

export const blockCreditCardMapper = (
  accountId: string,
  accountType: string,
  refType: string
): IBlockProductBody => ({
  accountId,
  accountType,
  companyId: BANKS.BANCO_POPULAR,
  refType
});
