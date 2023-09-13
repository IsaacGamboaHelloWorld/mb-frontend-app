import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Params } from '@angular/router';

import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { IAllMessageState } from '@modules/messages/store/messages.state';

@Injectable()
export class MessagesFacadeMock extends MainContainerFacadeMock {
  public routerParams$: Observable<Params> = new BehaviorSubject({
    id: '292199'
  });

  public messages$: Observable<IAllMessageState> = new BehaviorSubject({
    loading: false,
    messages: [
      {
        id: '292199',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-05T15:33:50',
        read: true,
        old: true,
        startDt: '2021-01-05T15:23:12'
      },
      {
        id: '291860',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-30T15:23:15'
      },
      {
        id: '291753',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-29T15:23:11'
      },
      {
        id: '291686',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-28T15:23:20'
      },
      {
        id: '291558',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-24T15:23:27'
      },
      {
        id: '291528',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-23T15:22:58'
      },
      {
        id: '291239',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-22T15:23:02'
      },
      {
        id: '291065',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-19T15:23:21'
      },
      {
        id: '291027',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-18T15:23:16'
      },
      {
        id: '290973',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-17T15:23:15'
      },
      {
        id: '290898',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-16T15:23:22'
      },
      {
        id: '290827',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2021-01-04T10:23:43',
        read: true,
        old: true,
        startDt: '2020-12-15T15:23:29'
      },
      {
        id: '290767',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2020-12-14T15:42:32',
        read: true,
        old: true,
        startDt: '2020-12-14T15:23:17'
      },
      {
        id: '290594',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2020-12-14T15:42:32',
        read: true,
        old: true,
        startDt: '2020-12-11T15:23:28'
      },
      {
        id: '290536',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2020-12-14T15:42:32',
        read: true,
        old: true,
        startDt: '2020-12-10T15:23:21'
      },
      {
        id: '290479',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2020-12-10T09:16:27',
        read: true,
        old: true,
        startDt: '2020-12-09T15:23:02'
      },
      {
        id: '290396',
        title: 'Información Saldo',
        content:
          'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
        upDt: '2020-12-07T15:50:42',
        read: true,
        old: true,
        startDt: '2020-12-07T15:23:26'
      }
    ],
    completed: true,
    error: false,
    errorMessage: '',
    retry: false
  });

  public fetchMessages(): void {}
  public fetchDeleteMessages(): void {}
  public fetchReadMessage(): void {}
  public resetMessages(): void {}
}
