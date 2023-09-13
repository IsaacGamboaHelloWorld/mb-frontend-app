import { ADVANCES } from '@commons/constants/navigatie-global';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { FormAdvanceComponent } from '@modules/detail/advances/new-advance/components/form-advance/form-advance.component';

export const CONFIG_TEMPLATE_ADVANCES: IConfigTemplate = {
  beforeUrl: '/',
  defaultUrl: ADVANCES,
  ionContent: null,
  toWho: {
    component: FormAdvanceComponent
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
