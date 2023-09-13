import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { HOME } from '@commons/constants/navigatie-global';

@Component({
  selector: 'app-biometric',
  templateUrl: './biometric.page.html',
  styleUrls: ['./biometric.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BiometricPage {
  constructor(private router: Router) {}

  public close(): void {
    this.router.navigate([HOME]);
  }
}
