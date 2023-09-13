export interface IWithdrawalPlace {
  icon: string;
  name: string;
  value: string;
}

export interface IWithdrawalFixedAmount {
  id: number;
  value: string;
}

export const WITHDRAWAL_FIXED_AMOUNT: IWithdrawalFixedAmount[] = [
  {
    id: 1,
    value: '20000'
  },
  {
    id: 2,
    value: '50000'
  },
  {
    id: 3,
    value: '100000'
  },
  {
    id: 4,
    value: '200000'
  },
  {
    id: 5,
    value: '300000'
  },
  {
    id: 6,
    value: '400000'
  },
  {
    id: 7,
    value: '600000'
  }
];

export const OTHER_AMOUNT = {
  id: 0,
  value: 'Otro Valor'
};

export const WITHDRAWAL_PLACES: IWithdrawalPlace[] = [
  {
    icon: 'icon-vel-atm',
    name: 'TRANSFER_WITHDRAWAL.TO_WHO.PLACES.ATM',
    value: 'ATM'
  },
  {
    icon: 'icon-vel-map-pin',
    name: 'TRANSFER_WITHDRAWAL.TO_WHO.PLACES.CORRESPONDENT',
    value: 'CB'
  }
];
