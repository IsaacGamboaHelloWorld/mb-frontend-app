import { TRANSFER_WITHDRAWALS } from '@commons/constants/navigatie-global';
import { FormTransferWithdrawalComponent } from '@modules/transfer-withdrawal/new-withdrawal/components/form-transfer-withdrawal/form-transfer-withdrawal.component';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { UrlsTemplateConstant } from '@commons/velocity/templates/utils/constants/urls-template.constant';

export const CONFIG_TEMPLATE_TRANSFER_WITHDRAWAL: IConfigTemplate = {
  beforeUrl: '/',
  defaultUrl: TRANSFER_WITHDRAWALS,
  ionContent: null,
  toWho: {
    component: FormTransferWithdrawalComponent
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
