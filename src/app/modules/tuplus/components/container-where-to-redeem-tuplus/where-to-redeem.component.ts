import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation
} from '@angular/core';

import { environment } from '@environment/environment';
import { TUPLUS_OPTION_TO_REDEEM } from '@commons/constants/navigatie-global';
import { TuplusAbstract } from '@modules/tuplus/utils/tuplus.abstract';

@Component({
  selector: 'app-container-where-to-redeem-tuplus',
  templateUrl: './where-to-redeem.component.html',
  styleUrls: ['./where-to-redeem.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class WhereToRedeemComponent extends TuplusAbstract {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public back(): void {
    this.navCtrl.navigateBack(TUPLUS_OPTION_TO_REDEEM);
  }

  public openBrowser(): void {
    window.open(environment.external_url.tuplus, '_system', 'location=no');
    this.facade.logout();
  }
}
