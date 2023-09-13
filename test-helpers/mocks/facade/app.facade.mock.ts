import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppFacadeMock {
  public isLogged$: Observable<boolean> = new BehaviorSubject(false);
  public complementary$: Observable<boolean> = new BehaviorSubject(false);
  public beforeUrl$: Observable<string> = new BehaviorSubject('');
  public setIsLogged(): void {}
  public logout(): void {}
  public openToast(): void {}
  public enableLoading(): void {}
  public disableLoading(): void {}
}
