export interface IWithdrawalPlace {
  icon: string;
  name: string;
  value: string;
}

export interface OptionRedeem {
  icon: string;
  title: string;
  content: string;
  deactivate?: boolean;
  id: number;
}

export interface IWithdrawalFixedAmount {
  id: number;
  value: string;
}

export const EXCLUDED_BINES: string[] = [
  '539814',
  '435651',
  '435729',
  '536170'
];

export const OTHER_AMOUNT = {
  id: 0,
  value: 'Otro Valor'
};

export const WITHDRAWAL_PLACES: IWithdrawalPlace[] = [
  {
    icon: 'icon-vel-money-box-b',
    name: 'TUPLUS.WHERE_TO_REDEEM.DEPOSIT_ACCOUNT',
    value: 'DAC'
  },
  {
    icon: 'icon-vel-creditcards',
    name: 'TUPLUS.WHERE_TO_REDEEM.CREDIT_ACCOUNT',
    value: 'CC'
  }
];

export const REDEEMCARD: OptionRedeem = {
  icon: 'icon-vel-money-coins',
  title: 'TUPLUS.OPTION_TO_REDEEM.MONEY',
  content: 'TUPLUS.OPTION_TO_REDEEM.PAY_ACCOUNT_TEXT',
  id: 1
};
export const BENEFITSCARD: OptionRedeem = {
  icon: 'icon-vel-benefits',
  title: 'TUPLUS.OPTION_TO_REDEEM.BENEFITS',
  content: 'TUPLUS.OPTION_TO_REDEEM.BENEFITS_TEXT',
  id: 2
};

export const OPTION_TO_REDEEM: OptionRedeem[] = [REDEEMCARD, BENEFITSCARD];

export const DEPOSIT_ACCOUNT = 'DAC';
export const CREDIT_ACCOUNT = 'CC';
