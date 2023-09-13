import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'velocity-loader',
  templateUrl: './velocity-loader.component.html',
  styleUrls: ['./velocity-loader.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityLoaderComponent {
  constructor(private modalService: ModalService) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }
}
