import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HOME } from '@commons/constants/navigatie-global';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordPage {
  constructor(
    private navCtrl: NavController,
    private facade: ChangePasswordFacade
  ) {}

  ionViewDidLeave(): void {
    this.facade.resetChangePassword();
  }

  public close(): void {
    this.navCtrl.navigateRoot([HOME]);
  }

  get isComplete$(): Observable<boolean> {
    return this.facade.changePassword$.pipe(map((cp) => cp.completed));
  }
}
