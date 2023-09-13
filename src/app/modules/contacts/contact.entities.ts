export interface IContactService {
  contacts: IGroupContact[];
  stores: {
    title: string;
    android: string;
    ios: string;
  };
}

export interface IGroupContact {
  group: string;
  numbers: INumberContact[];
}

export interface INumberContact {
  name: string;
  number: string;
  numberText: string;
}
