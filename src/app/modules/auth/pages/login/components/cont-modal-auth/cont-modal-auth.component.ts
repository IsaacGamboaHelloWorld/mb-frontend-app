import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-cont-modal-auth',
  templateUrl: './cont-modal-auth.component.html',
  styleUrls: ['./cont-modal-auth.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContModalAuthComponent {
  constructor(public modalService: ModalService) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }
}
