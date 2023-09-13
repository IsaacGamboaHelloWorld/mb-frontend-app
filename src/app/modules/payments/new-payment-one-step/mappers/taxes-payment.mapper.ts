import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { BANKS } from '@commons/constants/banks';
import {
  ITaxesAgreementsRequest,
  ITaxesAmountReferenceRequest,
  ITaxesPaymentRequest
} from '@modules/payments/entities/tax-payment.entities';

export const taxesAgreementsServiceMapper = (
  cityId: string
): ITaxesAgreementsRequest => ({
  cityId
});

export const taxesAmountReferenceServiceMapper = (
  reference: number,
  billerId: string
): ITaxesAmountReferenceRequest => ({
  companyId: BANKS.BANCO_POPULAR,
  invoiceNumber: reference.toString(),
  billerId
});

export const taxesPaymentServiceMapper = (
  template: ISaveDataTemplate
): ITaxesPaymentRequest => ({
  accountId: template?.toWho?.from?.id,
  accountType: template?.toWho?.from?.typeAccount,
  cityId: template?.toWho?.isBarcode
    ? template?.toWho?.biller?.cityId
    : template?.toWho?.city?.id,
  serviceCode: template?.toWho?.isBarcode
    ? template?.toWho?.biller?.billerId
    : template?.toWho?.biller?.request?.billerId,
  nie: template?.toWho?.isBarcode
    ? template?.toWho?.biller?.reference
    : template?.toWho?.biller?.request?.invoiceNumber,
  invoiceNumber: template?.toWho?.isBarcode
    ? template?.toWho?.biller?.reference
    : template?.toWho?.biller?.request?.invoiceNumber,
  amount: template?.toWho?.biller?.amount.toString(),
  serviceCompanyName: template?.toWho?.isBarcode
    ? template?.toWho?.biller?.billerName
    : template?.toWho?.city?.name + ', ' + template?.toWho?.tax?.entityName,
  currencyCode: 'COP',
  references: ['test']
});
