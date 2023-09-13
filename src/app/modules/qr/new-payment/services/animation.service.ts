import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class AnimationService {
  private _showShadow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _actionClick: Subject<void> = new Subject<void>();
  constructor() {}

  get showShadow(): Observable<boolean> {
    return this._showShadow.asObservable();
  }

  get actionClick(): Observable<void> {
    return this._actionClick.asObservable();
  }

  public setShowShadow(status: boolean): void {
    this._showShadow.next(status);
  }

  public setActionClick(): void {
    this._actionClick.next();
  }
}
