import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import {
  CONFIRMATION_REGISTER,
  CONFIRMATION_REMOVAL,
  IBiometricConfirmationItem
} from '@modules/biometric/constants/biometric.constant';
import {
  BIOMETRIC,
  BIOMETRIC_REGISTERED,
  HOME
} from '@commons/constants/navigatie-global';

@Component({
  selector: 'app-successful-removal',
  templateUrl: './successful-removal.component.html',
  styleUrls: ['./successful-removal.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessfulRemovalComponent {
  constructor(private router: Router) {}

  get confirmationData(): IBiometricConfirmationItem {
    return this.router.url === BIOMETRIC_REGISTERED
      ? CONFIRMATION_REGISTER
      : CONFIRMATION_REMOVAL;
  }

  public goHome(): void {
    this.router.navigate([HOME]);
  }

  public goToRegisterBiometric(): void {
    this.router.navigate([BIOMETRIC]);
  }
}
