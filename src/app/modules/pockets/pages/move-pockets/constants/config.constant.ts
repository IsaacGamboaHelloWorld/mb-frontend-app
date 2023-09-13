import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import {
  POCKETS_HOME,
  POCKETS_MOVE
} from '@commons/constants/navigatie-global';
import { FormMovePocketsComponent } from '@modules/pockets/pages/move-pockets/components/form-move-pockets/form-move-pockets.component';

export const CONFIG_TEMPLATE_MOVE_POCKETS: IConfigTemplate = {
  beforeUrl: POCKETS_HOME,
  defaultUrl: POCKETS_MOVE,
  ionContent: null,
  toWho: {
    component: FormMovePocketsComponent
  },
  router: [
    {
      url: '',
      step: 1
    },
    {
      url: `/${UrlsTemplateConstant.success}`,
      step: 2
    }
  ]
};
