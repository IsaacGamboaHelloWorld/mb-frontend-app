import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { ICreatePocketRequest } from '@modules/pockets/entities/pockets.entities';

export const createPocketServiceMapper = (
  template: ISaveDataTemplate
): ICreatePocketRequest => {
  return {
    parentAccountId: template?.toWho?.parentAccount.id,
    parentAccountType: template?.toWho?.parentAccount.type.toUpperCase(),
    pocketName: template?.toWho?.pocketName,
    pocketPeriod: template?.when?.pocketPeriod,
    savingAmount: template?.howMuch?.savingAmount?.normal,
    periodicAmount: template?.when?.periodicAmount?.normal,
    openingAmount: 0,
    category: template?.toWho?.destination
  };
};
