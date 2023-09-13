import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import {
  IPilaInformationRequest,
  IPilaPaymentRequest
} from '@modules/payments/entities/pila-payment.entities';
import { FormGroup } from '@angular/forms';
import { IBillerDetailBody } from '@modules/payments/entities/billers.entities';

export const pilaInfoPayrollMapper = (
  form: FormGroup
): IPilaInformationRequest => ({
  id: form?.value?.documentId,
  idType: 'CC',
  pilaInformation: {
    id: form?.value?.documentId,
    idType: 'CC',
    referenceType: 'PERIODO',
    agreementId: form?.value?.to?.organizationId,
    referenceId: `${form?.value?.year}${form?.value?.month?.id}`
  }
});

export const pilaInfoBillerMapper = (form: FormGroup): IBillerDetailBody => ({
  billerPayment: {
    billerId: form?.value?.to?.organizationId,
    contract: form?.value?.payrollNumber.toString()
  }
});

export const pilaPaymentServiceMapper = (
  template: ISaveDataTemplate
): IPilaPaymentRequest => {
  const dumm = {
    originAccount: {
      accountId: template?.toWho?.from?.id,
      accountType: template?.toWho?.from?.typeAccount
    },
    payment: {
      amount: +template?.toWho?.paymentInfo?.amount,
      billerId: template?.toWho?.to?.organizationId,
      billerName: template?.toWho?.to?.entityName,
      invoice:
        template?.toWho?.referenceType === 1
          ? template?.toWho?.paymentInfo?.invoice
          : template?.toWho?.paymentInfo?.invoiceNumber,
      nie:
        template?.toWho?.referenceType === 1
          ? template?.toWho?.paymentInfo?.invoice
          : template?.toWho?.paymentInfo?.invoiceNumber
    }
  };
  return dumm;
};
