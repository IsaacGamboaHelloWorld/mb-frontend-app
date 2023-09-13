import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ModalInfoComponent {
  public saveData: boolean = false;
  constructor(
    public modalService: ModalService,
    private securityStorage: AdlSecureStorageService
  ) {}

  public toggle(): void {
    this.saveData = !this.saveData;
  }

  public async close(): Promise<void> {
    this.saveData &&
      (await this.securityStorage.put(
        KEYS.MODAL_TRANSFER_WITHDRAWAL,
        'true',
        true
      ));
    this.modalService.close();
  }
}
