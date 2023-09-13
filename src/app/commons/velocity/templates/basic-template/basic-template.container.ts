import {
  Component,
  Injector,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

import { ConfigTemplateAbstract } from '@commons/velocity/templates/utils/abstracts/config-template.abstract';

@Component({
  selector: 'app-basic-template',
  templateUrl: './basic-template.container.html',
  styleUrls: ['./basic-template.container.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BasicTemplateContainer extends ConfigTemplateAbstract
  implements OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.resetTemplate();
  }
}
