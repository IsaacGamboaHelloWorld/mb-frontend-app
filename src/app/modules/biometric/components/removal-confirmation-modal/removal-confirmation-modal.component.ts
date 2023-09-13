import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '@commons/services/modal.service';
import { BIOMETRIC_REMOVED } from '@commons/constants/navigatie-global';
import { KEYS } from '@commons/constants/global';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

@Component({
  selector: 'app-removal-confirmation-modal',
  templateUrl: './removal-confirmation-modal.component.html',
  styleUrls: ['./removal-confirmation-modal.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemovalConfirmationModalComponent {
  constructor(
    private securityStorageService: AdlSecureStorageService,
    public modalService: ModalService,
    private router: Router
  ) {}

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }

  public async redirect(): Promise<void> {
    await this.securityStorageService.remove(KEYS.BIOMETRIC, true);
    this._navigateTo(BIOMETRIC_REMOVED);
  }

  private _navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
