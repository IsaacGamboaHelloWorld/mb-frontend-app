export interface IVoucher {
  id: string;
  img: {
    url: string;
    type?: string;
  };
  title: string;
  description?: string;
  amount?: Item;
  date?: string;
  list: Item[];
  download?: {
    name: string;
    icon?: string;
  };
}

interface Item {
  name: string;
  value: string;
}
