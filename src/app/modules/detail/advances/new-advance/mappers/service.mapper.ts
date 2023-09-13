import { IAdvanceService } from '@modules/detail/advances/new-advance/entities/advances.entities';

export const advancesServiceMapper = (form: any): IAdvanceService => ({
  accountFromInformation: {
    accountIdentifier: form?.from?.id,
    productType: form?.from?.typeAccount,
    bank: form?.from?.accountInformation?.bank,
    expirationMonth: form?.expirationMonth,
    expirationYear: '20' + form?.expirationYear
  },
  accountToInformation: {
    accountIdentifier: form?.to?.id,
    productType: form?.to?.typeAccount,
    bank: form?.to?.accountInformation?.bank
  },
  advanceInformation: {
    amount: form?.amount?.normalize?.toString(),
    currencyCode: 'COP',
    description: form?.description,
    numberFees: 36
  }
});
