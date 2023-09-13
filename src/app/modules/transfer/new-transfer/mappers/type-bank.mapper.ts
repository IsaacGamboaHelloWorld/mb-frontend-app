import { IRegisteredAccount } from '@modules/transfer/entities/registered-account.entities';
import { ICustomBank, ITypeBank } from '@commons/entities/type-bank.entities';

const customBankMapper = (bank: IRegisteredAccount): ICustomBank => {
  let bankCustom: ICustomBank;
  switch (bank.bankId) {
    case '0001':
      bankCustom = {
        background: '#0040a8',
        initialLetter: 'B'
      };
      break;
    case '0002':
      bankCustom = {
        background: '#00a80c',
        initialLetter: 'P'
      };
      break;
    case '0006':
    case '0014':
      bankCustom = {
        background: '#ff6d00',
        initialLetter: 'I'
      };
      break;
    case '0007':
      bankCustom = {
        background: '#ffc800',
        initialLetter: 'B'
      };
      break;
    case '0009':
      bankCustom = {
        background: '#003b70',
        initialLetter: 'C'
      };
      break;
    case '0012':
      bankCustom = {
        background: '#78b400',
        initialLetter: 'S'
      };
      break;
    case '0013':
      bankCustom = {
        background: '#0034a2',
        initialLetter: 'B'
      };
      break;
    case '0019':
      bankCustom = {
        background: '#ff0006',
        initialLetter: 'C'
      };
      break;
    case '0023':
      bankCustom = {
        background: '#0081ff',
        initialLetter: 'O'
      };
      break;
    case '0031':
      bankCustom = {
        background: '#3b4643',
        initialLetter: 'B'
      };
      break;
    case '0032':
      bankCustom = {
        background: '#0079c8',
        initialLetter: 'C'
      };
      break;
    case '0040':
      bankCustom = {
        background: '#00b900',
        initialLetter: 'A'
      };
      break;
    case '0042':
      bankCustom = {
        background: '#00966c',
        initialLetter: 'P'
      };
      break;
    case '0051':
      bankCustom = {
        background: '#ff0000',
        initialLetter: 'D'
      };
      break;
    case '0052':
      bankCustom = {
        background: '#e50019',
        initialLetter: 'A'
      };
      break;
    case '0058':
      bankCustom = {
        background: '#c6022c',
        initialLetter: 'P'
      };
      break;
    case '0059':
      bankCustom = {
        background: '#e3030f',
        initialLetter: 'B'
      };
      break;
    case '0060':
      bankCustom = {
        background: '#fbdb00',
        initialLetter: 'P'
      };
      break;
    case '0061':
      bankCustom = {
        background: '#00934a',
        initialLetter: 'C'
      };
      break;
    case '0062':
      bankCustom = {
        background: '#b8da00',
        initialLetter: 'F'
      };
      break;
    case '0063':
      bankCustom = {
        background: '#ff0015',
        initialLetter: 'F'
      };
      break;
    case '0064':
      bankCustom = {
        background: '#ff0004',
        initialLetter: 'M'
      };
      break;
    case '0065':
      bankCustom = {
        background: '#ff0000',
        initialLetter: 'S'
      };
      break;
    case '0066':
      bankCustom = {
        background: '#4562a1',
        initialLetter: 'C'
      };
      break;
    case '0067':
      bankCustom = {
        background: '#ff0014',
        initialLetter: 'C'
      };
      break;
    case '0121':
      bankCustom = {
        background: '#002e64',
        initialLetter: 'J'
      };
      break;
    case '0283':
      bankCustom = {
        background: '#ffc800',
        initialLetter: 'A'
      };
      break;
    case '0289':
      bankCustom = {
        background: '#0721ce',
        initialLetter: 'C'
      };
      break;
    case '0292':
      bankCustom = {
        background: '#5fc52a',
        initialLetter: 'C'
      };
      break;
    case '0370':
      bankCustom = {
        background: '#f7b92a',
        initialLetter: 'C'
      };
      break;
    case '0507':
      bankCustom = {
        background: '#ff0071',
        initialLetter: 'N'
      };
      break;
    default:
      bankCustom = {
        background: '#e4e4e4',
        initialLetter: bank?.bankName?.charAt(0)?.toUpperCase()
      };
  }
  return bankCustom;
};

export function typeBankMapper(product: IRegisteredAccount): ITypeBank {
  return {
    bankName: product?.bankName,
    name: product?.customerName,
    account: `${this.translateService.instant(
      'PRODUCT_TYPES_SMALL.' + product?.destinationAccountType
    )} ${product?.destinationAccountId.slice(-4)}`,
    customBank: customBankMapper(product)
  };
}
