import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation
} from '@angular/core';

import { ConfigPageOpenAccountAbstract } from '@commons/velocity/pages/utils/config-page-open-account.abstract';

@Component({
  selector: 'app-open-account-custom',
  templateUrl: './open-account-custom.page.html',
  styleUrls: ['./open-account-custom.page.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenAccountCustomPage extends ConfigPageOpenAccountAbstract {
  constructor(protected injector: Injector) {
    super(injector);
  }
}
