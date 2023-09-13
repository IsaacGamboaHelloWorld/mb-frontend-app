import {
  HOME_TRANSFER,
  NEW_TRANSFER_NOT_REGISTERED
} from '@commons/constants/navigatie-global';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';

export const CONFIG_TEMPLATE_NEW_TRANSFER_NOT_REGISTERED: IConfigTemplate = {
  beforeUrl: HOME_TRANSFER,
  defaultUrl: NEW_TRANSFER_NOT_REGISTERED,
  ionContent: null,
  toWho: {
    component: null
  },
  router: [
    {
      url: '',
      step: 1
    },
    {
      url: `/${UrlsTemplateConstant.confirmation}`,
      step: 2
    },
    {
      url: `/${UrlsTemplateConstant.success}`,
      step: 3
    }
  ]
};
