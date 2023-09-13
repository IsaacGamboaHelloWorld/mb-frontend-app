import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { filter, first, takeUntil } from 'rxjs/operators';
import { interval } from 'rxjs';
import totp from 'totp-generator';

import { TotpService } from '@modules/totp/services/totp.service';
import { ConfigGlobalPageAbstractContainer } from '@commons/velocity/templates/utils/abstracts/config-global-page.abstract';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
type SvgInHtml = HTMLElement & SVGElement;

@Component({
  selector: 'app-totp',
  templateUrl: './totp.page.html',
  styleUrls: ['./totp.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TotpPage extends ConfigGlobalPageAbstractContainer {
  public token: string;
  constructor(private totpService: TotpService, protected injector: Injector) {
    super(injector);
  }

  static getBucketTime(): number {
    const expiry = 30;
    const now = new Date().getTime();
    const epoch = Math.round(now / 1000.0);
    return epoch % expiry;
  }

  static progress(time: number): void {
    const progressValue: SvgInHtml = document.querySelector('.progress-value');
    const progress = time / 29;
    if (!!progressValue)
      progressValue.style.strokeDashoffset = String(
        CIRCUMFERENCE * (1 - progress)
      );
  }

  ionViewWillEnter(): void {
    this.totpService
      .fetchTotp()
      .pipe(
        filter((data) => data.success && data?.devices.length > 0),
        first()
      )
      .subscribe((totpToken) => {
        interval(1000)
          .pipe(takeUntil(this._destroy$))
          .subscribe((_) => {
            this.token = totp(totpToken.devices[0].secret);
            !!this.token && TotpPage.progress(TotpPage.getBucketTime());
          });
      });
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
