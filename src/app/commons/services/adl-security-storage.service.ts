import { Injectable } from '@angular/core';
import {
  OneSpanSecureStorage,
  OneSpanSecureStoragePlugin,
  OneSpanStorageAllData
} from '@avaldigitallabs/one-span-secure-storage';
import { Capacitor } from '@capacitor/core';

import { DEVICE_MOCK, KEYS, PERSIST_WEB } from '@commons/constants/global';
import { environment } from '@environment/environment';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class AdlSecureStorageService {
  private counter: number = 1;
  private temporal: string;
  private oneSpanSecureStorage: OneSpanSecureStoragePlugin = OneSpanSecureStorage as OneSpanSecureStoragePlugin;

  public async initDB(fingerPrint: string): Promise<void> {
    this.temporal = fingerPrint;
    const deviceInfo = await Device.getInfo();
    const hash = await this._sha256(
      `${deviceInfo.manufacturer}:${deviceInfo.model}`
    );

    if (this.counter > 3) {
      return;
    }

    try {
      await this.oneSpanSecureStorage.initDB({
        storageName: `${KEYS.DATA_BASE}${this.counter}`,
        fingerPrint: `${hash}${this.counter}`,
        iterationNumber: 8000
      });

      const deviceId = await this.get(KEYS.DEVICE_ID);
      !deviceId &&
        (await this.put(
          KEYS.DEVICE_ID,
          environment.addDeviceId ? fingerPrint : DEVICE_MOCK,
          true
        ));
      this.temporal = null;
    } catch (error) {
      this.counter = this.counter + 1;
      this.initDB(this.temporal);
      console.error('ERROR INIT SECURE STORAGE');
    }
  }

  public async getAll(): Promise<OneSpanStorageAllData> {
    return await this.oneSpanSecureStorage.getAll();
  }

  public async get(forKey: string): Promise<string> {
    try {
      const { value } = await this.oneSpanSecureStorage.getString({ forKey });
      return value;
    } catch (e) {
      return null;
    }
  }

  public async put(
    forKey: string,
    forValue: string,
    writeOnPermanentStorage: boolean = false
  ): Promise<boolean> {
    try {
      await this.oneSpanSecureStorage.putString({
        forKey,
        forValue
      });
      if (writeOnPermanentStorage) {
        const toPersist = await this.get(KEYS.TO_PERSIST);
        const newValues = !!toPersist
          ? [...JSON.parse(toPersist), forKey]
          : [forKey];
        const value = JSON.stringify([...new Set(newValues)]);
        await this.oneSpanSecureStorage.putString({
          forKey: KEYS.TO_PERSIST,
          forValue: value
        });
      }
      return this.writeOnPermanentStorage();
    } catch (error) {
      return null;
    }
  }

  public async remove(
    forKey: string,
    writeOnPermanentStorage: boolean = false
  ): Promise<boolean> {
    try {
      await this.oneSpanSecureStorage.remove({
        forKey
      });
      if (writeOnPermanentStorage) {
        const toPersist = await this.get(KEYS.TO_PERSIST);
        const keys =
          !!toPersist &&
          (JSON.parse(toPersist) || []).filter((key) => key !== forKey);
        await this.put(KEYS.TO_PERSIST, JSON.stringify(keys));
      }
      return this.writeOnPermanentStorage();
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  public async clearDB(): Promise<void> {
    const all = await this.getAll();
    let toPersist: Array<string>;
    try {
      toPersist = JSON.parse(all?.data[KEYS.TO_PERSIST]);
    } catch (err) {
      toPersist = [];
    }
    for (const el of Object.keys(all?.data)) {
      if (Capacitor.getPlatform() !== 'web') {
        const isPersist = toPersist.find(
          (find) => find === el || el === KEYS.TO_PERSIST
        );
        !isPersist && (await this.remove(el));
      } else {
        const isPersist = PERSIST_WEB.find((find) => find === el);
        !isPersist && (await this.remove(el));
      }
      Capacitor.getPlatform() === 'web' &&
        (await this.oneSpanSecureStorage.putString({
          forKey: KEYS.TO_PERSIST,
          forValue: `["${KEYS.DEVICE_ID}", "${KEYS.REMEMBER}"]`
        }));
    }
  }

  public async writeOnPermanentStorage(): Promise<boolean> {
    try {
      const { write } = await this.oneSpanSecureStorage.write();
      return write;
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  private async _sha256(str: string): Promise<string> {
    return crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(str))
      .then((buf) => {
        return Array.prototype.map
          .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
          .join('');
      });
  }
}
