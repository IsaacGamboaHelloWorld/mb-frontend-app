export interface IProductDetail {
  information: IProductDetailInformation;
  services: IProductDetailService[];
  success: boolean;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IProductDetailInformation {
  img?: string;
  icon?: string;
  name: string;
  id: string;
  status?: {
    text: string;
    class: string;
  };
  amount?: {
    title: string;
    value: string;
  };
  content?: {
    list: ItemList[];
    description?: string;
  };
}

export interface ItemList {
  title: string;
  value: string;
  hasPocket?: boolean;
  loading?: boolean;
}

export interface IProductDetailService {
  type: string;
  img: string;
  id: string;
  name?: string;
  disabled?: boolean;
  hasPermissions?: boolean;
}

export interface IRange {
  from?: string;
  to?: string;
}
