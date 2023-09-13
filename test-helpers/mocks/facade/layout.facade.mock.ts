import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LayoutFacadeMock {
  get hasErrorProducts$(): Observable<boolean> {
    return new BehaviorSubject(false);
  }

  public logout(): void {}
}
