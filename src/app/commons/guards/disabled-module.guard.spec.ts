import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { TestingModule } from '@test-helpers/testing.module';

import { AppFacade } from '@app/app.facade';
import { DisabledModuleGuard } from './disabled-module.guard';
import { ID_SECTIONS } from '@commons/constants/menu_items';
import {
  HOME_PAYMENT,
  QR_PAYMENT,
  RECHARGES,
  TRANSFER_WITHDRAWALS
} from '@commons/constants/navigatie-global';
import { ConfigService } from '@commons/services/config.service';
import { environment } from '@environment/environment';

let complementary = true;

describe('DisabledModuleGuard', () => {
  let guard: DisabledModuleGuard;
  let injectedService: AppFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        DisabledModuleGuard,
        {
          provide: AppFacade,
          useValue: {
            complementary$: of((complementary = !complementary))
          }
        },
        {
          provide: ConfigService,
          useValue: {
            config: [
              {
                id: 'payment',
                enabled: true,
                new: false
              },
              {
                id: 'transferWithDrawal',
                enabled: false,
                new: false
              },
              {
                id: 'recharge',
                enabled: true,
                new: false
              },
              {
                id: 'QR',
                enabled: true,
                new: false
              }
            ]
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    injectedService = TestBed.inject(AppFacade);
    guard = TestBed.inject(DisabledModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be LoggedGuard to work with Observable.delay tap true', fakeAsync(() => {
    injectedService.complementary$ = new BehaviorSubject(true);
    const next = {
      routeConfig: {
        data: {}
      }
    };
    const state = {
      url: HOME_PAYMENT
    };
    timerObservable(next, state);
  }));

  it('should be LoggedGuard to work with Observable.delay return true with complementary', fakeAsync(() => {
    injectedService.complementary$ = new BehaviorSubject(true);
    const next = {
      routeConfig: {
        data: {
          parent: ID_SECTIONS.recharge
        }
      }
    };
    const state = {
      url: RECHARGES
    };
    timerObservable(next, state);
  }));

  it('should be LoggedGuard to work with Observable.delay return false', fakeAsync(() => {
    injectedService.complementary$ = new BehaviorSubject(false);
    const next = {
      routeConfig: {
        data: {
          parent: ID_SECTIONS.recharge
        }
      }
    };
    const state = {
      url: RECHARGES
    };
    timerObservable(next, state);
  }));

  it('should be LoggedGuard to work with Observable.delay return false with complementary', fakeAsync(() => {
    injectedService.complementary$ = new BehaviorSubject(false);
    const next = {
      routeConfig: {
        data: {
          parent: ID_SECTIONS.transferWithDrawal
        }
      }
    };
    const state = {
      url: TRANSFER_WITHDRAWALS
    };
    timerObservable(next, state);
  }));

  it('should be LoggedGuard to work with Observable.delay return false with redirect', fakeAsync(() => {
    injectedService.complementary$ = new BehaviorSubject(false);
    environment.validateComplementary = true;
    const next = {
      routeConfig: {
        data: {}
      }
    };
    const state = {
      url: QR_PAYMENT
    };
    timerObservable(next, state);
  }));

  function timerObservable(next: any, state: any): void {
    let actuallyDone = false;
    const source = guard.canActivateChild(next as any, state as any);
    source.subscribe(
      (val) => {
        actuallyDone = true;
      },
      (err) => fail(err)
    );
    tick(100);
    expect(actuallyDone).toBeTruthy();

    discardPeriodicTasks();
  }
});
