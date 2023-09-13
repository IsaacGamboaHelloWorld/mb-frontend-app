import { IAuthData } from '@commons/entities/auth-data.entities';

export type State = Readonly<{
  isLoggedIn: boolean;
  authData: IAuthData;
  beforeUrl: string;
}>;

export const initialState: State = {
  isLoggedIn: false,
  authData: null,
  beforeUrl: null
};
