import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  IQrAnnulmentState,
  IQrPaymentState
} from '@modules/qr/new-payment/store/qr.state';
import {
  qrAnnulment,
  qrPayment
} from '@modules/qr/new-payment/store/qr.selector';
import {
  qrPaymentLoadAction,
  qrPaymentResetAction
} from '@modules/qr/new-payment/store/actions/qr-payment.action';
import {
  IQrInfoBody,
  IQrPaymentBody
} from '@modules/qr/new-payment/entities/qr.entities';
import {
  qrAnnulmentLoadAction,
  qrAnnulmentResetAction
} from '@modules/qr/new-payment/store/actions/qr-annulment.action';

@Injectable()
export class QrFacade extends MainContainerFacade {
  public qrPayment$: Observable<IQrPaymentState> = this.store.pipe(
    select(qrPayment)
  );

  public qrAnnulment$: Observable<IQrAnnulmentState> = this.store.pipe(
    select(qrAnnulment)
  );

  public fetchQrPayment(body: IQrPaymentBody): void {
    this.store.dispatch(qrPaymentLoadAction(body));
  }

  public qrPaymentReset(): void {
    this.store.dispatch(qrPaymentResetAction());
  }

  public fetchQrAnnulment(body: IQrInfoBody): void {
    this.store.dispatch(qrAnnulmentLoadAction(body));
  }

  public qrAnnulmentReset(): void {
    this.store.dispatch(qrAnnulmentResetAction());
  }
}
