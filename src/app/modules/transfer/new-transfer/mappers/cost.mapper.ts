import { ICostTransferService } from '@modules/transfer/entities/cost-transfer.entities';
import { Product } from '@commons/models/product.model';
import { IRegisteredAccount } from '@modules/transfer/entities/registered-account.entities';

export const costTransferMapper = (
  from: Product,
  to: IRegisteredAccount
): ICostTransferService => {
  return {
    accountFromInformation: {
      accountIdentifier: from?.id,
      productType: from?.typeAccount
    },
    accountToInformation: {
      accountIdentifier: to?.destinationAccountId,
      bank: to?.bankId,
      productType: to?.destinationAccountType
    }
  };
};
