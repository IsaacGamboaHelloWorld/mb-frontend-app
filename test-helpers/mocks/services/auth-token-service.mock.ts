import { Observable, of } from 'rxjs';

export class AuthTokenServiceMock {
  static sha256(str: string): void {}
  static _initFirebase(str: string): void {}

  get getDeviceId$(): Observable<string> {
    return of('');
  }

  public checkInitToken(): void {}
  public initDB(): void {}
  public initEvents(): void {}
  public checkDeviceId(): void {}
  public _initTealium(): void {}
  public isAuth(): void {}
}
