import {
  AfterViewInit,
  Component,
  Injector,
  ViewEncapsulation
} from '@angular/core';
import { ConfigTemplateAbstract } from '@commons/velocity/templates/utils/abstracts/config-template.abstract';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class StepOneComponent extends ConfigTemplateAbstract
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
