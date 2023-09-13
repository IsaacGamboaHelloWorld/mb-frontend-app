import { Type } from '@angular/core';

import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import {
  NEW_PAYMENT_LOANS,
  NEW_PAYMENT_NOT_REGISTERED,
  NEW_PAYMENT_PUBLIC
} from '@commons/constants/navigatie-global';
import { ToWhoPublicComponent } from '@modules/payments/new-payment/components/to-who-public/to-who-public.component';
import { ToWhoLoansComponent } from '@modules/payments/new-payment/components/to-who-loans/to-who-loans.component';
import { HowMuchPublicComponent } from '@modules/payments/new-payment/components/how-much-public/how-much-public.component';
import { HowMuchLoanComponent } from '@modules/payments/new-payment/components/how-much-loan/how-much-loan.component';
import { ToWhoNotRegisteredComponent } from '@modules/payments/new-payment/components/to-who-not-registered/to-who-not-registered.component';
import { HowMuchNotRegisteredComponent } from '@modules/payments/new-payment/components/how-much-not-registered/how-much-not-registered.component';
import { newPaymentConfirmationMapper } from '@modules/payments/new-payment/mappers/confirmation-payment.mapper';
import { newPaymentLoanConfirmationMapper } from '@modules/payments/new-payment/mappers/confirmation-payment-loan.mapper';
import { newPaymentNotRegisteredConfirmationMapper } from '@modules/payments/new-payment/mappers/confirmation-payment-not-registered.mapper';

const setToWho = (url: string): Type<any> => {
  switch (url) {
    case NEW_PAYMENT_PUBLIC:
      return ToWhoPublicComponent;
    case NEW_PAYMENT_LOANS:
      return ToWhoLoansComponent;
    case NEW_PAYMENT_NOT_REGISTERED:
      return ToWhoNotRegisteredComponent;
    default:
      return null;
  }
};

const setHowMuch = (url: string): Type<any> => {
  switch (url) {
    case NEW_PAYMENT_PUBLIC:
      return HowMuchPublicComponent;
    case NEW_PAYMENT_LOANS:
      return HowMuchLoanComponent;
    case NEW_PAYMENT_NOT_REGISTERED:
      return HowMuchNotRegisteredComponent;
    default:
      return null;
  }
};

export const addPaymentComponents = (
  config: IConfigTemplate,
  url: string
): IConfigTemplate => ({
  ...config,
  toWho: {
    component: setToWho(url)
  },
  howMuch: {
    component: setHowMuch(url)
  }
});

export const setMapperConfirmation = (url: string): any => {
  switch (url) {
    case NEW_PAYMENT_PUBLIC:
      return newPaymentConfirmationMapper;
    case NEW_PAYMENT_LOANS:
      return newPaymentLoanConfirmationMapper;
    case NEW_PAYMENT_NOT_REGISTERED:
      return newPaymentNotRegisteredConfirmationMapper;
    default:
      return null;
  }
};
