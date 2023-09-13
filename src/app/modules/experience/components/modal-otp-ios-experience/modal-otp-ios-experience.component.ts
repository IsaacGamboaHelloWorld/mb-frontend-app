import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: '[app-modal-otp-ios-experience]',
  templateUrl: './modal-otp-ios-experience.component.html',
  styleUrls: ['./modal-otp-ios-experience.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ImageCdnPipe]
})
export class ModalOtpIosExperienceComponent {
  constructor(public modalService: ModalService) {}
}
