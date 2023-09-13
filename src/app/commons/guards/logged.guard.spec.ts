import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { of } from 'rxjs';

import { LoggedGuard } from '@commons/guards/logged-guard.service';
import { TestingModule } from 'test-helpers/testing.module';
import { AppFacade } from '@app/app.facade';

let isLogged = true;

describe('LoggedGuard', () => {
  let guard: LoggedGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        LoggedGuard,
        {
          provide: AppFacade,
          useValue: {
            isLogged$: of((isLogged = !isLogged))
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(LoggedGuard);
  });

  it('should be create LoggedGuard', () => {
    guard.canActivate();
    expect(guard).toBeTruthy();
  });

  it('should be LoggedGuard to work with Observable.delay tap true', fakeAsync(() => {
    timerObservable();
  }));

  it('should be LoggedGuard to work with Observable.delay return false', fakeAsync(() => {
    timerObservable();
  }));
  function timerObservable(): void {
    let actuallyDone = false;
    const source = guard.canActivate();
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
