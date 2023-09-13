import { Type } from '@angular/core';

import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import {
  NEW_PAYMENT_PILA,
  NEW_PAYMENT_TAXES
} from '@commons/constants/navigatie-global';
import { FormTaxesComponent } from '@modules/payments/new-payment-one-step/components/form-taxes/form-taxes.component';
import { taxesPaymentConfirmationMapper } from '@modules/payments/new-payment-one-step/mappers/taxes-confirmation.mapper';
import { FormPilaComponent } from '@modules/payments/new-payment-one-step/components/form-pila/form-pila.component';
import { pilaPaymentConfirmationMapper } from '@modules/payments/new-payment-one-step/mappers/pila-confirmation.mapper';

const setToWho = (url: string): Type<any> => {
  switch (url) {
    case NEW_PAYMENT_TAXES:
      return FormTaxesComponent;
    case NEW_PAYMENT_PILA:
      return FormPilaComponent;
    default:
      return null;
  }
};

export const addPaymentOneStepComponents = (
  config: IConfigTemplate,
  url: string
): IConfigTemplate => ({
  ...config,
  toWho: {
    component: setToWho(url)
  }
});

export const setMapperConfirmation = (url: string): any => {
  switch (url) {
    case NEW_PAYMENT_TAXES:
      return taxesPaymentConfirmationMapper;
    case NEW_PAYMENT_PILA:
      return pilaPaymentConfirmationMapper;
    default:
      return null;
  }
};
