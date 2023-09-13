import { Component, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { TranslateService } from '@ngx-translate/core';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  INTERVAL_TIME_IDLE_SESSION,
  INTERVAL_TIME_SESSION
} from '@commons/constants/global';
import { ModalService } from '@commons/services/modal.service';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { GlobalService } from '@commons/services/global.service';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.html',
  encapsulation: ViewEncapsulation.None
})
export class MainContainer {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private facade: MainContainerFacade,
    private idle: Idle,
    private modalService: ModalService,
    private authSessionService: AuthSessionService,
    private _translateService: TranslateService,
    private globalService: GlobalService
  ) {
    environment.production &&
      this.authSessionService
        .hasTokenData()
        .then((state) => !!state && this._startIdle());
  }

  ionViewWillEnter(): void {
    this.facade.fetchLoadProducts();
    this.facade.fetchUserData();
    this._validations();
    this._intervalValidate();
  }

  ionViewDidLeave(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _intervalValidate(): void {
    interval(INTERVAL_TIME_SESSION)
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => this._validations());
  }

  private _validations(): void {
    this.facade.validatePing();
    this.facade.validateSession();
  }

  private _startIdle(): void {
    this.idle.setIdle(5);
    this.idle.setTimeout(INTERVAL_TIME_IDLE_SESSION);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onTimeout.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.globalService.setLogOutAuto = true;
      !!this.modalService.modal && this.modalService.close();
      this._logout();
    });
    this.idle.watch();
  }

  private _logout(): void {
    this.idle.stop();
    this.idle.ngOnDestroy();
    this.facade.logout();
  }
}
