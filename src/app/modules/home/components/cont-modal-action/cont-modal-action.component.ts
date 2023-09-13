import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-cont-modal-action',
  templateUrl: './cont-modal-action.component.html',
  styleUrls: ['./cont-modal-action.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContModalActionComponent {
  constructor(public modalService: ModalService) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }
}
