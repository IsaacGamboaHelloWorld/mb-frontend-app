import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '@commons/models/product.model';
import {
  IOperatorsState,
  IRechargeState
} from '@app/modules/recharges/new-recharge/store/recharges.state';
import { initOperators } from '@app/modules/recharges/new-recharge/store/reducers/operators.reducer';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class RechargesFacadeMock extends MainContainerFacadeMock {
  public operators$: Observable<IOperatorsState> = new BehaviorSubject(
    initOperators
  );
  public recharge$: Observable<IRechargeState> = new BehaviorSubject({
    form: null,
    loading: false,
    completed: false,
    error: true,
    errorMessage: ''
  });

  public products$: Observable<Product[]> = new BehaviorSubject([]);
  public fetchOperators(): void {}
  public fetchRecharge(): void {}
  public resetRecharge(): void {}

  public filterProducts$(): Observable<any[]> {
    return new BehaviorSubject([]);
  }
}
