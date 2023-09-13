export interface ITypeTaxCertificate {
  name: string;
  icon: string;
  value: number;
  disabled?: boolean;
}

export const WITHHOLDING_TAXES: ITypeTaxCertificate = {
  name: 'DOCUMENTS.TAX_CERTIFICATES.TYPE_CERTIFICATES.WITHHOLDING',
  icon: 'icon-vel-essential-list-12',
  value: 1,
  disabled: false
};

export const GMF: ITypeTaxCertificate = {
  name: 'DOCUMENTS.TAX_CERTIFICATES.TYPE_CERTIFICATES.GMF',
  icon: 'icon-vel-essential-list-12',
  value: 2,
  disabled: false
};

export const INCOME_DECLARATION_TC: ITypeTaxCertificate = {
  name: 'DOCUMENTS.TAX_CERTIFICATES.TYPE_CERTIFICATES.INCOME_DECLARATION_TC',
  icon: 'icon-vel-essential-list-12',
  value: 3,
  disabled: true
};

export const RAC: ITypeTaxCertificate = {
  name: 'DOCUMENTS.TAX_CERTIFICATES.TYPE_CERTIFICATES.RAC',
  icon: 'icon-vel-essential-list-12',
  value: 4,
  disabled: false
};

export const TYPE_CERTIFICATES: ITypeTaxCertificate[] = [
  WITHHOLDING_TAXES,
  GMF,
  RAC,
  INCOME_DECLARATION_TC
];

export const NUMBER_OF_YEARS_LIST = 4;
