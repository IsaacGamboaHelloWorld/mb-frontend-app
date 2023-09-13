import { Injectable } from '@angular/core';
import { BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

@Injectable()
export class CapacitorElementsMock {
  public static scan(): Promise<BarcodeScanResult> {
    return new Promise((resolve) =>
      resolve({
        cancelled: false,
        format: 'CODE_128',
        text: 'any text'
      })
    );
  }
}
