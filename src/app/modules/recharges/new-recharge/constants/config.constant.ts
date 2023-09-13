import { RECHARGES } from '@commons/constants/navigatie-global';

import { FormRechargeComponent } from '@modules/recharges/new-recharge/components/form-recharge/form-recharge.component';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';

export const CONFIG_TEMPLATE_RECHARGE: IConfigTemplate = {
  beforeUrl: '/',
  defaultUrl: RECHARGES,
  ionContent: null,
  toWho: {
    component: FormRechargeComponent
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
