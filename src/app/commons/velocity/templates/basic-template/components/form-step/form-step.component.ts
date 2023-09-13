import {
  AfterViewInit,
  Component,
  Injector,
  ViewEncapsulation
} from '@angular/core';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { ConfigTemplateAbstract } from '@commons/velocity/templates/utils/abstracts/config-template.abstract';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FormStepComponent extends ConfigTemplateAbstract
  implements AfterViewInit {
  constructor(
    private service: ConfigTemplateService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.injectComponent(this.service?.config?.toWho?.component);
    }, 0);
  }
}
