import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { ModalService } from '@commons/services/modal.service';
import { KEYS } from '@commons/constants/global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

@Component({
  selector: 'app-cont-modal-pocket-home',
  templateUrl: './cont-modal-pocket-home.component.html',
  styleUrls: ['./cont-modal-pocket-home.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContModalPocketHomeComponent {
  public showModalAgain: boolean = true;
  constructor(
    public modalService: ModalService,
    private secureStorage: AdlSecureStorageService
  ) {}

  @Input() title: string;
  @Input() firstDescription: string;
  @Input() secondDescription: string;
  @Input() thirdDescription: string;
  @Input() textBtn: string;
  @Input() checkboxText: string;

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }

  public closeModal(): void {
    this._saveSecureStorage();
    this.modalService.close();
  }

  public changeShowModalAgain(): void {
    this.showModalAgain = !this.showModalAgain;
  }

  private async _saveSecureStorage(): Promise<void> {
    await this.secureStorage.put(
      KEYS.SHOW_MODAL_POCKETS,
      this.showModalAgain.toString(),
      true
    );
  }
}
