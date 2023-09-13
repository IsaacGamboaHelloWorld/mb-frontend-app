import {
  Component,
  Injector,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

import { ConfigTemplateAbstract } from '@commons/velocity/templates/utils/abstracts/config-template.abstract';

@Component({
  selector: 'app-advance-template',
  templateUrl: './advance-template.container.html',
  styleUrls: ['./advance-template.container.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AdvanceTemplateContainer extends ConfigTemplateAbstract
  implements OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.resetTemplate();
  }

  get hasLineTime(): boolean {
    return this.configTemplate?.lineTime.length > 0 && this.step <= 3;
  }

  get lineTime(): string[] {
    return this.configTemplate?.lineTime;
  }
}
