import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IActiveCreditCardState } from '@modules/activate-credit-card/store/active-credit-card.state';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class HomeActiveBlockFacadeMock extends MainContainerFacadeMock {
  public activeCreditCard$: Observable<
    IActiveCreditCardState
  > = new BehaviorSubject({
    information: null,
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });

  public fetchActiveCreditCard(): void {}
  public resetActiveCreditCard(): void {}
}
