import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

@Component({
  selector: 'app-cont-alert',
  templateUrl: './cont-alert.component.html',
  styleUrls: ['./cont-alert.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContAlertComponent {
  constructor(
    public modalService: ModalService,
    private configTemplate: ConfigTemplateService
  ) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }

  public beforeUrl(): void {
    this.configTemplate.changeStep(
      {
        url: this.configTemplate.config.beforeUrl,
        step: 1
      },
      false
    );
  }
}
