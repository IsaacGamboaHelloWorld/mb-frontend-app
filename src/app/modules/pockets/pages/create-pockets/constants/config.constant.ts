import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import {
  POCKETS_CREATE,
  POCKETS_HOME
} from '@commons/constants/navigatie-global';
import { HowMuchComponent } from '@modules/pockets/pages/create-pockets/components/how-much/how-much.component';
import { ForWhatComponent } from '@modules/pockets/pages/create-pockets/components/for-what/for-what.component';
import { HowComponent } from '@modules/pockets/pages/create-pockets/components/how/how.component';

export const CONFIG_TEMPLATE_CREATE_POCKETS: IConfigTemplate = {
  beforeUrl: POCKETS_HOME,
  defaultUrl: POCKETS_CREATE,
  ionContent: null,
  toWho: {
    component: ForWhatComponent
  },
  howMuch: {
    component: HowMuchComponent
  },
  when: {
    component: HowComponent
  },
  lineTime: ['Para qué', 'Cuánto', 'Cómo'],
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
      url: `/${UrlsTemplateConstant.success}`,
      step: 4
    }
  ]
};
