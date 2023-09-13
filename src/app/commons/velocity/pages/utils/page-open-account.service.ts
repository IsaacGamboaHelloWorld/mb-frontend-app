import { Injectable } from '@angular/core';

import { IOpenAccount } from '@app/commons/entities/open-account.entities';

@Injectable({
  providedIn: 'root'
})
export class PageOpenAccountService {
  private _params: IOpenAccount;

  set params(value: IOpenAccount) {
    this._params = value;
  }

  get params(): IOpenAccount {
    return this._params;
  }
}
