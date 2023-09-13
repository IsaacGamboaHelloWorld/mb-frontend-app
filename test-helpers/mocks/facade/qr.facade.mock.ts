import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  IQrAnnulmentState,
  IQrPaymentState
} from '@modules/qr/new-payment/store/qr.state';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class QrFacadeMock extends MainContainerFacadeMock {
  public qrPayment$: Observable<IQrPaymentState> = new BehaviorSubject({
    information: null,
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });
  public qrAnnulment$: Observable<IQrAnnulmentState> = new BehaviorSubject({
    information: null,
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });
  public qrPaymentReset(): void {}
  public fetchQrPayment(): void {}
  public fetchQrAnnulment(): void {}
  public qrAnnulmentReset(): void {}
}
