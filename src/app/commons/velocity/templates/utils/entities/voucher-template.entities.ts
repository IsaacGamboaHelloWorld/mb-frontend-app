import { IVoucher } from '@commons/entities/voucher.entities';

export interface IVoucherTemplateEntities {
  voucher: IVoucher;
  buttonFirst?: IActionVoucher;
  buttonSecond?: IActionVoucher;
}

interface IActionVoucher {
  name: string;
  loading?: boolean;
  action?: any;
  className: string;
  id?: string;
}
