import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { HowMuchPublicComponent } from '@modules/payments/new-payment/components/how-much-public/how-much-public.component';
import { WhenComponent } from '@modules/payments/new-payment/components/when/when.component';
import { HOME_PAYMENT } from '@commons/constants/navigatie-global';

export const CONFIG_TEMPLATE_NEW_PAYMENT: IConfigTemplate = {
  beforeUrl: HOME_PAYMENT,
  defaultUrl: null,
  ionContent: null,
  toWho: {
    component: null
  },
  howMuch: {
    component: HowMuchPublicComponent
  },
  when: {
    component: WhenComponent
  },
  lineTime: ['A quién', 'Por cuánto', 'Cuándo'],
  router: [
    {
      url: '',
      step: 1
    },
    {
      url: `/${UrlsTemplateConstant.howMuch}`,
      step: 2
    },
    {
      url: `/${UrlsTemplateConstant.when}`,
      step: 3
    },
    {
      url: `/${UrlsTemplateConstant.confirmation}`,
      step: 4
    },
    {
      url: `/${UrlsTemplateConstant.success}`,
      step: 5
    }
  ]
};
