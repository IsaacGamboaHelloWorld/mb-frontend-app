import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { TestingModule } from 'test-helpers/testing.module';
import { AppFacade } from '@app/app.facade';

let isLogged = true;

describe('AuthGuard', () => {
  let guard: AuthGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AppFacade,
          useValue: {
            isLogged$: of((isLogged = !isLogged))
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be create AuthGuard', () => {
    guard.canActivate();
    expect(guard).toBeTruthy();
  });

  it('should be AuthGuard to work with Observable.delay tap true', fakeAsync(() => {
    timerObservable();
  }));

  it('should be AuthGuard to work with Observable.delay return false', fakeAsync(() => {
    timerObservable();
  }));
  function timerObservable(): void {
    let actuallyDone = true;
    const source = guard.canActivate();
    source.subscribe(
      (val) => {
        actuallyDone = false;
      },
      (err) => fail(err)
    );
    tick(100);
    expect(actuallyDone).toBeFalsy();

    discardPeriodicTasks();
  }
});
