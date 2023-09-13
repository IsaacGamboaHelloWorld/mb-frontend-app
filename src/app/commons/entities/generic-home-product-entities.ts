export interface IGenericHome {
  type: 'card' | 'list';
  title: string;
  img?: string;
  imgTitle?: string;
  items: IGenericHomeItem[];
}

export interface IGenericHomeItem {
  icon?: string;
  img?: string;
  title: string;
  description: string;
  path: string;
  enable: boolean;
  id?: string;
  idHTML?: string;
  hasPermissions?: boolean;
}
