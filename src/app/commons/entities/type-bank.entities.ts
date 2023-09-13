export interface ITypeBank {
  bankName: string;
  name: string;
  account: string;
  customBank: ICustomBank;
}
export interface ICustomBank {
  background: string;
  initialLetter: string;
}
