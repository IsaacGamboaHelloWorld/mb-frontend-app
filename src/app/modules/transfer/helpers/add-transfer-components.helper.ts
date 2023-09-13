import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { NEW_TRANSFER } from '@commons/constants/navigatie-global';
import { ToWhoComponent } from '@modules/transfer/new-transfer/components/to-who/to-who.component';
import { ToWhoNotRegisteredComponent } from '@modules/transfer/transfer-not-registered/components/to-who-not-registered/to-who-not-registered.component';

export const addTransferComponents = (
  config: IConfigTemplate,
  url: string
): IConfigTemplate => ({
  ...config,
  toWho: {
    component:
      url === NEW_TRANSFER ? ToWhoComponent : ToWhoNotRegisteredComponent
  }
});
