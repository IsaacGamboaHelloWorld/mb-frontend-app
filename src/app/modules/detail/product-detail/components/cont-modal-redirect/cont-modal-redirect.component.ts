import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '@app/commons/services/modal.service';
import { ADVANCES } from '@commons/constants/navigatie-global';
import { KEYS } from '@commons/constants/global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

@Component({
  selector: 'app-cont-modal-redirect',
  templateUrl: './cont-modal-redirect.component.html',
  styleUrls: ['./cont-modal-redirect.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContModalRedirectComponent {
  constructor(
    public modalService: ModalService,
    private router: Router,
    private securityStorageService: AdlSecureStorageService
  ) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }

  public redirect(): void {
    this._saveSecureStorage(this.props.id, this.props.type);
    this.router.navigate([ADVANCES]);
  }

  private async _saveSecureStorage(id: string, type: string): Promise<void> {
    await this.securityStorageService.put(
      KEYS.ACTIVE_PRODUCT,
      JSON.stringify({
        id,
        type
      })
    );
  }
}
