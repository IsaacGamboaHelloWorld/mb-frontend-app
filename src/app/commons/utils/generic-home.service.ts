import { Injectable } from '@angular/core';

import { IGenericHome } from '../entities/generic-home-product-entities';

@Injectable({
  providedIn: 'root'
})
export class GenericHomeService {
  private _items: IGenericHome;

  set items(value: IGenericHome) {
    this._items = value;
  }

  get items(): IGenericHome {
    return this._items;
  }
}
