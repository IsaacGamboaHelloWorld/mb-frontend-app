import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-modal-otp-ios',
  templateUrl: './modal-otp-ios.component.html',
  styleUrls: ['./modal-otp-ios.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ImageCdnPipe]
})
export class ModalOtpIosComponent {
  constructor(public modalService: ModalService) {}
}
