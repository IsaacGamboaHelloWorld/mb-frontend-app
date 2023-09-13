import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-modal-custom',
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCustomComponent {
  constructor(public modalService: ModalService) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }
}
