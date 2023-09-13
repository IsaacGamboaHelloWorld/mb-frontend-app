import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { QR_PAYMENT } from '@commons/constants/navigatie-global';
import { ToWhoQrComponent } from '@modules/qr/new-payment/components/to-who-qr/to-who-qr.component';

const validateUrl = (url: string): object => {
  switch (url) {
    case QR_PAYMENT:
      return {
        toWho: {
          component: ToWhoQrComponent
        }
      };
    default:
      return null;
  }
};

export const configDefaultQr = (
  config: IConfigTemplate,
  url: string
): IConfigTemplate => ({
  ...config,
  ...validateUrl(url)
});
