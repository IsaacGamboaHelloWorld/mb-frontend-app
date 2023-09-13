import { IProductsPack } from '@commons/entities/products.entities';

export interface IRespondServiceProducts {
  products: IProductsPack;
  errorMessage: string;
  success: boolean;
}

export interface IProductBasic {
  type: string;
  id: string;
}

export interface IProductNickname {
  name: string;
  type: string;
  accountId: string;
  accountType: string;
}

export interface INicknamesResponse {
  nicknames: IProductNickname[];
  success: boolean;
  errorMessage?: string;
}
