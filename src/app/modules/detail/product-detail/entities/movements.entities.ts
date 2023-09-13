export interface IMovement {
  accountInformation: IAccountInfo;
  operations: IOperation[];
  fileUrl: string;
  creditCardMovements: ICreditCardMovementInterface[];
  cdtMovements: any;
  success?: boolean;
  errorMessage?: string;
}

export interface IAccountInfo {
  accountId: string;
  accountType: string;
}

export interface IOperation {
  transactionInformation: {
    transactionType: string;
    transactionName: string;
    transactionDate: string;
    transactionProvider: string;
  };
  officeInformation: {
    officeName: string;
    officeId: string;
  };
  amountsWithOperationType: {
    TICKET: string;
    OUTCOME: string;
    INCOME: string;
    CASH: string;
  };
}

export interface ICreditCardMovementInterface {
  fees: string;
  rate: string;
  debits: string;
  credits: string;
  description: string;
  transactionDate: string;
}

export interface ItemMovement {
  date?: string;
  realDate?: string;
  title: string;
  value: string;
  positive?: boolean;
  list: ItemMovementList[];
}

export interface ItemMovementList {
  title: string;
  value: string;
}

export interface IMovements {
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
  list: ItemMovement[];
}
