import { Injectable } from '@angular/core';

import { ItemConfig } from '@commons/entities/config';
// @ts-ignore
import configInfo from '../../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config: ItemConfig[] = configInfo.config;
  constructor() {}

  get config(): ItemConfig[] {
    return this._config;
  }
}
