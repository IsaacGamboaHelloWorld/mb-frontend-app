import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalGenericComponent {
  constructor(public modalService: ModalService) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }

  get typeButtons(): typeof STATUS_BUTTONS {
    return STATUS_BUTTONS;
  }

  public actionButton(type: string, closeAction: boolean): void {
    closeAction && this.modalService.close();
    this.modalService.setActionButton(type);
  }
}
