import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import {
  POCKETS_EDIT,
  POCKETS_HOME
} from '@commons/constants/navigatie-global';
import { FormEditPocketsComponent } from '@modules/pockets/pages/edit-pockets/components/form-edit-pockets/form-edit-pockets.component';

export const CONFIG_TEMPLATE_EDIT_POCKETS: IConfigTemplate = {
  beforeUrl: POCKETS_HOME,
  defaultUrl: POCKETS_EDIT,
  ionContent: null,
  toWho: {
    component: FormEditPocketsComponent
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
