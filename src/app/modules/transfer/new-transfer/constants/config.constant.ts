import { WhenComponent } from '@modules/transfer/new-transfer/components/when/when.component';
import { HowMuchComponent } from '@modules/transfer/new-transfer/components/how-much/how-much.component';
import {
  HOME_TRANSFER,
  NEW_TRANSFER,
  NEW_TRANSFER_NOT_REGISTERED
} from '@commons/constants/navigatie-global';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';

export const CONFIG_TEMPLATE_NEW_TRANSFER: IConfigTemplate = {
  beforeUrl: HOME_TRANSFER,
  defaultUrl: NEW_TRANSFER,
  ionContent: null,
  toWho: {
    component: null
  },
  howMuch: {
    component: HowMuchComponent
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
