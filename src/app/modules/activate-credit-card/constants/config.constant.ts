import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { ActiveCardComponent } from '@modules/activate-credit-card/components/active-card/active-card.component';
import { ACTIVE_CREDIT_CARD } from '@commons/constants/navigatie-global';

export const CONFIG_TEMPLATE_ACTIVE_PRODUCT: IConfigTemplate = {
  beforeUrl: '/',
  defaultUrl: ACTIVE_CREDIT_CARD,
  ionContent: null,
  emitButtons: true,
  toWho: {
    component: ActiveCardComponent
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
