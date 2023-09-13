export interface IDataUser {
  firstName: string;
  fullName: string;
  lastName: string;
  middleName: string;
  secondLastName: string;
  shortName: string;
  success: boolean;
}

export interface ItemNavBar {
  enable: boolean;
  hasProducts: boolean;
  navigateTo: string[];
  hasAmount: boolean;
  hasPermissions: boolean;
}
