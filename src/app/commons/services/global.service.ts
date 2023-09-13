import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private _logOutAuto: boolean = false;
  constructor() {}

  set setLogOutAuto(value: boolean) {
    this._logOutAuto = value;
  }

  get logOutAuto(): boolean {
    return this._logOutAuto;
  }
}
