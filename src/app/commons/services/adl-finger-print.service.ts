import { Injectable } from '@angular/core';

import {
  OnespanBinding,
  OnespanBindingPlugin,
  OnespanDeviceIdType
} from '@avaldigitallabs/one-span-device-fingerprint';
import { FINGERPRINTSALT } from '@commons/constants/global';

@Injectable({
  providedIn: 'root'
})
export class AdlFingerPrintService {
  private _oneSpanFingerPrint: OnespanBindingPlugin = OnespanBinding as OnespanBindingPlugin;

  public async fingerPrint(key: string = FINGERPRINTSALT): Promise<string> {
    try {
      const { fingerPrint } = await this._oneSpanFingerPrint.getFingerprint({
        salt: key,
        androidIdType: OnespanDeviceIdType.ANDROID_ID_AND_SERIAL_NUMBER
      });
      return fingerPrint;
    } catch (error) {
      throw JSON.stringify(error);
    }
  }
}
