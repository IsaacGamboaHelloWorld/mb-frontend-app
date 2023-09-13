import { AfterViewInit, Component, Injector } from '@angular/core';

import { ConfigTemplateAbstract } from '@commons/velocity/templates/utils/abstracts/config-template.abstract';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass']
})
export class StepTwoComponent extends ConfigTemplateAbstract
  implements AfterViewInit {
  constructor(
    private service: ConfigTemplateService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.injectComponent(this.service?.config?.howMuch?.component);
    }, 0);
  }
}
