import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAdvanceState } from '@modules/detail/advances/new-advance/store/advances.state';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class AdvancesFacadeMock extends MainContainerFacadeMock {
  public advance$: Observable<IAdvanceState> = new BehaviorSubject({
    response: null,
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });

  public filterProducts$(): Observable<any[]> {
    return new BehaviorSubject([]);
  }

  public fetchAdvance(): void {}
  public resetAdvance(): void {}
}
