import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { HOME_PAYMENT } from '@commons/constants/navigatie-global';

export const CONFIG_TEMPLATE_NEW_PAYMENT_ONE_STEP: IConfigTemplate = {
  beforeUrl: HOME_PAYMENT,
  defaultUrl: null,
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
